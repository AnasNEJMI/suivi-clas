import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg';
import {hashPassword} from '../src/utils/auth.utils.js'
import {
  SCOLAR_YEAR_TAGS,
  SUBJECTS,
  ASSOCIATIONS_SEED,
  ANIMATORS_SEED,
  LEVELS,
  LESSONS_SEED,
  SKILL_SEED,
} from "../src/db/seed.users.data.js";

import {PrismaClient} from '../src/generated/prisma/client.js'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

function resolveId(map: Map<string, number>, key: string, context: string): number {
  const id = map.get(key);
  if (!id) throw new Error(`[seed] "${key}" introuvable dans ${context} — vérifie l'orthographe`);
  return id;
}


// ─────────────────────────────────────────────
// 1. ANNÉE SCOLAIRE
// ─────────────────────────────────────────────
async function seedScolarYears(): Promise<Map<string, number>> {
  console.log(`Seeding scolar years  → "${SCOLAR_YEAR_TAGS.length}"`);
  for (let i = 0; i < SCOLAR_YEAR_TAGS.length; i++) {
    const scolarYear = SCOLAR_YEAR_TAGS[i];
    await prisma.scolarYear.create({ data: { tag: scolarYear } });
  }
  
  const rows = await prisma.scolarYear.findMany({ select: { id: true, tag: true } });
  return new Map(rows.map((s) => [s.tag, s.id]));
}

// ─────────────────────────────────────────────
// 2. NIVEAUX SCOLAIRES
// retourne Map<label, id>
// ─────────────────────────────────────────────
async function seedLevels(): Promise<Map<string, number>> {
  console.log(`  → ${LEVELS.length} niveaux`);

  await prisma.level.createMany({
    data: LEVELS.map(({ label, order }) => ({ label, order })),
  });

  const rows = await prisma.level.findMany({
    select: { id: true, label: true },
  });

  return new Map(rows.map((l) => [l.label, l.id]));
}

// ─────────────────────────────────────────────
// 2. MATIÈRES
// retourne un Map label → id pour usage futur (seed des leçons)
// ─────────────────────────────────────────────
async function seedSubjects(): Promise<Map<string, number>> {
  console.log(`Seeding  → ${SUBJECTS.length} matières`);

  await prisma.subject.createMany({
    data: SUBJECTS.map((label) => ({ label })),
  });

  const rows = await prisma.subject.findMany({ select: { id: true, label: true } });
  return new Map(rows.map((s) => [s.label, s.id]));
}

// ─────────────────────────────────────────────
// 3. LECONS
// retourne un Map label → id pour usage futur
// ─────────────────────────────────────────────
async function seedLessons(levelIdByLabel : Map<string, number>, subjectIdByLabel : Map<string, number>): Promise<void> {
  console.log(`Seeding les leçons des matières`);

  for(const lessonSeed of LESSONS_SEED){
    for(const subjectSeed of lessonSeed.subjects){
        console.log(`\n Seeding les leçons de la matière ${subjectSeed.subject} du niveau ${lessonSeed.level}`);
        await prisma.lesson.createMany({
            data : subjectSeed.lessons.map((lesson) => ({
                subjectId : resolveId(subjectIdByLabel, subjectSeed.subject, "SUBJECTS"),
                levelId : resolveId(levelIdByLabel, lessonSeed.level, "LEVELS"),
                label : lesson,
            }
        ))})
    }
  }
}

// ─────────────────────────────────────────────
// 4. ASSOCIATIONS → CLASSES → ÉLÈVES → MEMBRES
// ─────────────────────────────────────────────
async function seedAssociations(levelIdByLabel: Map<string, number>): Promise<Map<string, number>> {
    const associationIdByName = new Map<string, number>();
    for (const assocSeed of ASSOCIATIONS_SEED) {
        console.log(`\n Seeding → Association "${assocSeed.name}"`);

        const assoc = await prisma.association.create({data : {label : assocSeed.name}});
        associationIdByName.set(assoc.label, assoc.id);

        for(const classSeed of assocSeed.classes){
            console.log(`Seeding la classe "${classSeed.label} de l'association ${assocSeed.name}" — ${classSeed.students.length} élèves`);

            const studentData = await Promise.all(
                classSeed.students.map(async (s) => ({
                    username : s.username,
                    firstName : s.firstName,
                    lastName : s.lastName,
                    gender : s.gender,
                    level : {
                        connect: {
                            id: resolveId(levelIdByLabel, s.level, "LEVELS"),
                        }
                    },
                    passwordHash : await hashPassword(s.password),
                }))
            )

            const associationClass = await prisma.class.create({
                data : {
                    label : classSeed.label,
                    associationId : assoc.id,
                    students : {create : studentData},
                },
                include : {
                    students : true,
                }
            })

            //seeding skills
            const skillsData = await Promise.all(
                associationClass.students.map(async (student) => ({
                    studentId : student.id,
                    ...SKILL_SEED
                }))
            )
            await prisma.skill.createMany({
                data : skillsData
            })

            if (assocSeed.members.length > 0) {
                console.log(`Seeding les membres de l'association ${assoc.label} : ${assocSeed.members.length} membres`);
                const membersData = await Promise.all(
                    assocSeed.members.map(async (m) => ({
                    username:      m.username,
                    firstName:     m.firstName,
                    lastName:      m.lastName,
                    gender:        m.gender,
                    passwordHash:  await hashPassword(m.password),
                    associationId: assoc.id,
                    }))
                );

                await prisma.associationMember.createMany({ data: membersData });
            }

        }
    }

    return associationIdByName;
}


// ─────────────────────────────────────────────
// 5. ANIMATEURS + LIAISON MANY-TO-MANY
// ─────────────────────────────────────────────
async function seedAnimators(associationIdByName: Map<string, number>): Promise<void> {
    for (const animSeed of ANIMATORS_SEED) {
        const assocCount = animSeed.associations.length;
        console.log(`Seeding les animateurs  → ${animSeed.username} (${assocCount} association${assocCount > 1 ? "s" : ""})`);

        const connectIds = animSeed.associations.map((name) => {
            const id = associationIdByName.get(name);
            if(!id){
                throw new Error(`Association introuvable : "${name}" — vérifie l'orthographe dans ANIMATORS_SEED`);
            }

            return {id};
        });

        await prisma.animator.create({
            data : {
                username : animSeed.username,
                firstName:    animSeed.firstName,
                lastName:     animSeed.lastName,
                gender:       animSeed.gender,
                passwordHash: await hashPassword(animSeed.password),
                associations : {connect : connectIds},
            }
        })
    }
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────
async function main(): Promise<void> {
    console.log("\n Démarrage du seed...");

    console.log("\n[ 1/5 ] Année scolaire");
    await seedScolarYears();

    console.log("\n[ 2/5 ] Niveaux scolaires");
    const levelIdByLabel = await seedLevels();

    console.log("\n[ 3/5 ] Matières");
    const subjectIdByLabel = await seedSubjects();

    console.log("\n[ 3/5 ] Leçons");
    await seedLessons(levelIdByLabel, subjectIdByLabel);

    console.log("\n[ 4/5 ] Associations, classes & utilisateurs");
    const associationIdByName = await seedAssociations(levelIdByLabel);

    console.log("\n[ 5/5 ] Animateurs");
    await seedAnimators(associationIdByName);

    console.log("\n✅ Seed terminé avec succès.\n");
}

main()
  .catch((e) => {
    console.error("\n❌ Seed échoué :", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());