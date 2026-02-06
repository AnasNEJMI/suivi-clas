import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient,UserGender, UserRole } from '../src/generated/prisma/client.js'
import {hashPassword} from '../src/utils/auth.utils.js'
import {admin, CLASS_NAMES, ClassName, lessons, org, students} from './seed.data.js';

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
        const user = org[i];
        
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
        
        console.log("created students for class with with label : ", generatedClass.label, ' and id : ', generatedClass.id, '/n the generated students are : ', ...generatedStudents);
        
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
                
                generatedLessons.push(generatedLesson);
            }

            console.log("created lessons for class with with label : ", generatedClass.label, ' and id : ', generatedClass.id, '/n the generated math lessons lessons are : ', ...generatedLessons);
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