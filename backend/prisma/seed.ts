import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, UserGender, UserRole } from '../src/generated/prisma/client.js'
import {hashPassword} from '../src/utils/auth.utils.js'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const class4emeLabel = '4ème';
const class2ndLabel = '2nde';

const admin = {
    firstName : 'Anas',
    lastName : 'NEJMI',
    username : 'AnasNEJMI',
    gender : UserGender.m,
    password : 'Aa-14081992-@',
    role : UserRole.admin
}

const org = [
    {
        firstName : 'Sanae',
        lastName : 'Fleurs Du Lys',
        username : 'Sanae',
        gender : UserGender.f,
        password : 'FdL-Sanae-2026',
        role : UserRole.org
    },
    {
        firstName : 'Sabrina',
        lastName : 'Fleurs Du Lys',
        username : 'Sabrina',
        gender : UserGender.f,
        password : 'FdL-Sabrina-2026',
        role : UserRole.org
    },
]


const class4eme = [
    {
        firstName : 'Bilal',
        lastName : 'BENHIDA',
        username : 'Bilal',
        gender : UserGender.m,
        password : 'FdL-4eme-Bilal-2025-2026',
        class : class4emeLabel,
        role : UserRole.student
    },
    {
        firstName : 'Sarah',
        lastName : 'DUPRÉ',
        username : 'Sarah',
        gender : UserGender.f,
        password : 'FdL-4eme-Sarah-2025-2026',
        class : class4emeLabel,
        role : UserRole.student
    },
    {
        firstName : 'Imrane',
        lastName : 'FERHATI',
        username : 'Imrane',
        gender : UserGender.m,
        password : 'FdL-4eme-Imrane-2025-2026',
        class : class4emeLabel,
        role : UserRole.student
    },
    {
        firstName : 'Cyrine',
        lastName : 'MCHAR',
        username : 'Cyrine',
        gender : UserGender.f,
        password : 'FdL-4eme-Cyrine-2025-2026',
        class : class4emeLabel,
        role : UserRole.student
    },
    {
        firstName : 'Nasrinne',
        lastName : 'ZIOUCH',
        username : 'Nasrinne',
        gender : UserGender.f,
        password : 'FdL-4eme-ZIOUCH-2025-2026',
        class : class4emeLabel,
        role : UserRole.student
    },
    {
        firstName : 'Safya',
        lastName : 'LABIDI',
        username : 'Safya',
        gender : UserGender.f,
        password : 'FdL-4eme-Safya-2025-2026',
        class : class4emeLabel,
        role : UserRole.student
    },
    {
        firstName : 'Ahmed',
        lastName : 'KERZAZI',
        username : 'Ahmed',
        gender : UserGender.m,
        password : 'FdL-4eme-Ahmed-2025-2026',
        class : class4emeLabel,
        role : UserRole.student
    },
    {
        firstName : 'Imran',
        lastName : 'ABDELMOUMNI',
        username : 'Imran',
        gender : UserGender.m,
        password : 'FdL-4eme-Imran-2025-2026',
        class : class4emeLabel,
        role : UserRole.student
    },
    {
        firstName : 'Yosor',
        lastName : 'MARZOUK',
        username : 'Yosor',
        gender : UserGender.f,
        password : 'FdL-4eme-Yosor-2025-2026',
        class : class4emeLabel,
        role : UserRole.student
    },
]

const classLycee = [
    {
        firstName : 'Isra',
        lastName : 'Isra',
        username : 'Isra',
        class : class2ndLabel,
        password : 'FdL-2nde-Isra-2025-2026',
        role : UserRole.student
    },
]

async function main(){
    console.log('seeding databases ...');
    
    /////////////////////////////////////////////////////////////////

    console.log('creating classes ...');
    const classA = await prisma.class.create({
        data : {
            label : class4emeLabel,
        }
    })

    const classB = await  prisma.class.create({
        data : {
            label : class2ndLabel,
        }
    })

    console.log("classes created:", classA.label, classB.label);

    /////////////////////////////////////////////////////////////////

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

    const generatedClass4eme : {
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

    console.log("creating users ...");
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
    console.log("creating org ...");
    
    org.forEach(async user => {
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
    })
    
    console.log("created org : ", JSON.stringify(generatedOrgs));
    console.log("creating classe 4eme ...");

    class4eme.forEach(async user => {
        const passwordHash = await hashPassword(user.password);

        const generatedUser = await prisma.user.create({
            data : {
                firstName : user.firstName,
                lastName : user.lastName,
                username : user.username,
                role : user.role,
                passwordHash : passwordHash,
                classId : user.class === class4emeLabel ? classA.id : classB.id,
                gender : user.gender
            }
        })
        
        generatedClass4eme.push(generatedUser);
    });

    console.log("classe 4eme created:", JSON.stringify(generatedClass4eme));

    /////////////////////////////////////////////////////////////////

    console.log("Seeding finished!");
}

main().catch((e) => {
    console.error('error while seeding. ',e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});