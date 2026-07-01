import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { Difficulty, PrismaClient,UserGender, UserRole } from '../src/generated/prisma/client.js'
import {hashPassword} from '../src/utils/auth.utils.js'
import {admin, lessons, org, qcmQuestions, students} from '../src/db/seed.data.js';
import { CLASS_NAMES, Subject } from "../src/db/seed.types.js";

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main(){
    console.log('seeding databases ...');
    
    ////////////////////////////ADMIN/////////////////////////////////
    console.log("creating admin ...");

    const adminPasswordHash = await hashPassword(admin.password);
    const generatedAdmin = await prisma.user.create({
        data : {
            firstName : admin.firstName,
            lastName : admin.lastName,
            username : admin.username,
            role : admin.role,
            passwordHash : adminPasswordHash,
            gender : admin.gender,
        }
    })
    console.log("created admin : ", generatedAdmin);
    
    /////////////////////////ORG/////////////////////////////////
    console.log("creating org ...");
    const generatedOrgs : {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        username: string;
        firstName: string;
        lastName: string;
        passwordHash: string;
        gender: UserGender;
        role: UserRole;
        lastVisit: Date;
        classId: number | null;
    }[] = [];
    
    for (let i = 0; i < org.length; i++) {
        const user = org[i]!;
        
        const passwordHash = await hashPassword(user.password);
        const generateOrg = await prisma.user.create({
            data : {
                firstName : user.firstName,
                lastName : user.lastName,
                username : user.username,
                role : user.role,
                passwordHash : passwordHash,
                gender : user.gender,
            }
        })
        
        generatedOrgs.push(generateOrg);
    }

    console.log("created org. ", JSON.stringify(generatedOrgs));
    
        
    ////////////////////////////CLASSES////////////////////////////
    console.log("creating classes ....");

    for (const className of CLASS_NAMES) {
    
        //generate the class
        const generatedClass = await prisma.class.create({
            data : {
                label : className,
            }
        })

        console.log("created class with label : ", generatedClass.label, ' and id : ', generatedClass.id);
        
        //generate the students for the class
        console.log("creating students for class with with label : ", generatedClass.label, ' and id : ', generatedClass.id);
        
        const generatedStudents : {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            username: string;
            firstName: string;
            lastName: string;
            passwordHash: string;
            gender: UserGender;
            role: UserRole;
            lastVisit: Date;
            classId: number | null;
        }[] = [];
        
        const classStudents = students[className];

        for (const student of classStudents) {

            const passwordHash = await hashPassword(student.password);
            
            const generatedStudent = await prisma.user.create({
                data : {
                    firstName : student.firstName,
                    lastName : student.lastName,
                    username : student.username,
                    role : student.role,
                    passwordHash : passwordHash,
                    classId : generatedClass.id,
                    gender : student.gender
                }
            })
            
            generatedStudents.push(generatedStudent);
        };
        
        console.log("created students for class with with label : ", generatedClass.label, ' and id : ', generatedClass.id);
        
        //generate the lessons for the class
        console.log("creating lessons for class with with label : ", generatedClass.label, ' and id : ', generatedClass.id);
        let generatedLessons : {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            label: string;
            subject: string;
            classId: number | null;
        }[] = [];

        const classLessons = lessons[className];

        for(const subject in classLessons){
            const lessons = classLessons[subject as keyof typeof classLessons]

            console.log('subject :',subject, ' lessons:',lessons)

            for (const lesson of lessons) {
                const generatedLesson = await prisma.lesson.create({
                    data : {
                        classId : generatedClass.id,
                        label : lesson,
                        subject : subject,
                    }
                })

                //generate the qcm questions for the class
                console.log("creating qcm questions for lesson with with label : ", generatedLesson.label, ' and id : ', generatedLesson.id);
                let generatedBankQuestions : {
                    question : string,
                    difficulty : Difficulty,
                    answerA : string,
                    answerB : string,
                    answerC : string,
                    answerD : string,
                    correctAnswer : 'a' | 'b' | 'c' | 'd',
                    explanation : string,
                }[] = []

                const qcmQs = qcmQuestions[className][subject as Subject][generatedLesson.label];
                
                if(qcmQs && qcmQs.length > 0){
                    for (let i = 0; i < qcmQs.length; i++) {
                        const qcmQ = qcmQs[i]!;
                        
                        const generatedBankQuestion = await prisma.qcmBankQuestion.create({
                            data : {
                                lessonId : generatedLesson.id,
                                question : qcmQ.question,
                                difficulty : qcmQ.difficulty,
                                answerA : qcmQ.answerA,
                                answerB : qcmQ.answerB,
                                answerC : qcmQ.answerC,
                                answerD : qcmQ.answerD,
                                correctAnswer : qcmQ.correctAnswer,
                                explanation : qcmQ.explanation,
                            }
                        })

                        generatedBankQuestions.push(generatedBankQuestion);
                    }
                }
                console.log("created qcm questions for lesson with with label : ", generatedLesson.label, ' and id : ', generatedLesson.id);
                
                
                generatedLessons.push(generatedLesson);
            }

            console.log("created lessons for class with with label : ", generatedClass.label, ' and id : ', generatedClass.id);
            generatedLessons = [];  
        }

        
    };


    //////////////////////////LESSONS///////////////////////////////

    console.log("Seeding finished!");
}

main().catch((e) => {
    console.error('error while seeding. ',e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});