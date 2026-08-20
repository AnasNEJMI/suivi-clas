import "dotenv/config"
import { PrismaPg } from '@prisma/adapter-pg';
import {LessonEval, PrismaClient} from '../src/generated/prisma/client.js'
import {subWeeks, addWeeks, setMilliseconds, setSeconds, setHours, setMinutes, addDays} from 'date-fns';
import {generateQcmForBilan} from '../src/controllers/lib/qcm/generate-qcm-for-bilan.js'
//PRISMA CLIENT
const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });


//CONSTS
const LESSON_EVALS : LessonEval[] = ['notAcquired', 'acquiring','acquired','expert'];

//CONFIG PARAMS
const CONFIG = {
    bilans : {
        bilansPerStudent : 5,
        weeksBetween : 1,
        absencePct  : 0.2,
    },
    lessonEvals : {
        subjectsPerStudent : 3,
        lessonsPerSubject : 5,
    },
    skillEvals : {
        median : 11,
        variance : 3,
    }
}

//DUMMY DATA POOLS
const SUMMARIES = [
    `L'élève a participé activement à la séance et a montré une bonne compréhension des exercices proposés. Les notions abordées ont été assimilées correctement, avec quelques hésitations sur les points les plus complexes.

Des efforts sont à maintenir pour consolider les bases. Il est conseillé de revoir les exercices de la séance à la maison et de noter les questions en suspens.`,

    `La séance s'est déroulée dans de bonnes conditions. L'élève a su mobiliser ses connaissances antérieures pour progresser sur les nouveaux exercices. Les erreurs ont été identifiées et corrigées en temps réel.

Il conviendra de renforcer la pratique des exercices similaires. Une révision régulière des fiches de cours sera bénéfique pour ancrer les connaissances.`,

    `L'élève a rencontré quelques difficultés en début de séance, notamment sur les prérequis. Après une phase de remise à niveau, la compréhension s'est améliorée et les exercices ont été traités plus facilement.

Il est recommandé de revoir les notions fondamentales avant la prochaine séance. La régularité dans le travail personnel sera déterminante.`,

    `La séance a permis d'aborder de nouveaux concepts qui ont été bien reçus. La curiosité et l'implication de l'élève ont rendu la session particulièrement productive. Les exemples pratiques ont aidé à ancrer les notions théoriques.

Il serait utile d'explorer des exercices d'application variés et de s'entraîner sur des annales.`,

    `Très bonne séance dans l'ensemble. L'élève a montré des progrès notables, en particulier sur les points qui posaient problème lors des séances précédentes. La méthode de travail s'affine.

Il faut continuer sur cette lancée. Les objectifs fixés pour cette période sont en bonne voie d'être atteints.`,

    `L'élève a travaillé avec sérieux et a fourni les efforts nécessaires pour surmonter les obstacles. Certains concepts demandent encore un temps d'assimilation, mais la progression est réelle.

Un travail régulier à la maison permettra de renforcer les acquis et d'aborder la prochaine séance dans de meilleures conditions.`,

    `Séance productive axée sur la méthodologie. L'élève a pris conscience de l'importance de structurer sa démarche, ce qui a eu un impact positif immédiat sur la qualité des réponses.

Le travail en autonomie doit être encouragé. L'élève est invité à rédiger ses propres fiches de synthèse.`,

    `La séance a été consacrée à la préparation d'une évaluation à venir. Les points clés ont été passés en revue et les zones d'incertitude ont été identifiées et traitées.

La révision des exercices traités lors de cette séance est fortement recommandée avant l'évaluation.`,
]

const SKILL_POSITIVES = [
    "Bonne participation et attitude positive en séance.",
    "Élève attentif et impliqué dans les exercices proposés.",
    "Montre de la curiosité et pose des questions pertinentes.",
    "Respecte les consignes et s'adapte facilement aux changements.",
    "Fait preuve de persévérance face aux difficultés.",
    "Très bon niveau de concentration tout au long de la séance.",
    "S'exprime clairement et contribue positivement aux échanges.",
]

const SKILL_NEGATIVES = [
    "Tendance à se déconcentrer en fin de séance.",
    "Peut progresser sur la gestion du temps lors des exercices.",
    "Parfois hésitant à demander de l'aide quand nécessaire.",
    "Doit travailler la régularité dans son travail personnel.",
    "Quelques difficultés à maintenir le rythme sur les longues séances.",
    "Manque parfois de confiance en ses propres capacités.",
]

const SKILL_IMPROVEMENTS = [
    "Renforcer la mémorisation active en rédigeant des fiches de synthèse.",
    "Travailler la régularité des révisions entre les séances.",
    "Prendre l'habitude de relire ses notes après chaque séance.",
    "S'exercer davantage en autonomie pour consolider les acquis.",
    "Poser ses questions par écrit avant la séance pour les préparer.",
    "Consacrer 20 minutes par jour à la révision des notions vues en séance.",
]

//HELPER FUNCTIONS//
function parseArgs(){
    const args = new Set(process.argv.slice(2));

    const seedBilans = args.has("--bilans");
    const seedLessonEvals = args.has("--lesson-evals");
    const seedSkillEvals = args.has("--skill-evals");
    const clear = args.has("--clear");

    const seedAll = !seedBilans && !seedLessonEvals && !seedSkillEvals

    return {
        clear,
        bilans : seedBilans || seedAll,
        lessonEvals : seedLessonEvals || seedAll,
        skillEvals : seedSkillEvals || seedAll,
    }
}

function pickRandom<T>(arr : T[]){
    if(arr.length === 0) throw new Error("pickRandom : empty array");
    return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr : T[]){
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random()*(i+1));
        [copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy;
}

function pickSkillValue(){
    const median = CONFIG.skillEvals.median;
    const error = Math.floor(Math.random() * 2 * CONFIG.skillEvals.variance) -  CONFIG.skillEvals.variance;
    return median + error;
}

//by default we set the fixed day time to 14:00
function generateSeanceDates(count : number, weeksBetween : number){
    const now = new Date();
    const randDate = addDays(now, Math.floor(Math.random()*30));
    return Array.from({length : count}, (_,i) => {
        const d = addWeeks(randDate, (i+1) * weeksBetween);
        return setMilliseconds(setSeconds(setMinutes(setHours(d, 14), 0), 0), 0)
    })
}

function dayRange(date : Date){
    const gte = new Date(date); gte.setUTCHours(0,0,0,0);
    const lt = new Date(date); lt.setUTCHours(23,59,59,59);
    return {gte, lt}
}

//loading data fuction
async function loadContracts(){
    return prisma.animatorContract.findMany({
        where : {
            animatorId : {not : null},
            classId : {not : null},
            scolarYearId : {not : null},
        },
        select : {
            id : true,
            animatorId : true,
            scolarYearId : true,
            class : {
                select : {
                    id : true,
                    label : true,
                    students : {
                        orderBy : [{lastName : 'asc'}, {firstName : 'asc'}],
                        select : {
                            id : true,
                            firstName : true,
                            lastName : true,
                            level : {
                                select : {
                                    id : true,
                                    label : true,
                                    lessons : {
                                        select : {
                                            id : true,
                                            label : true,
                                            subject : {
                                                select : {
                                                    id : true,
                                                    label : true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}


type Contracts  = Awaited<ReturnType<typeof loadContracts>>;

//RESULT TRACKING FUNCTIONS
type SeedResult = {created : number, skipped : number, errors : string[]}

function emptySeedResult() : SeedResult {return {created : 0, skipped : 0, errors : []}}

function printSeedResult(label : string, seedResult : SeedResult){
    console.log(`\n Seed results for : ${label}`);
    console.log(`\n created : ${seedResult.created}`);
    if(seedResult.skipped > 0) console.log(`\n skipped : ${seedResult.created} (already exist)`);
    if(seedResult.errors.length > 0) {
        console.log(`\n errors : ${seedResult.created}`);
    }
    seedResult.errors.forEach(err => console.log(`\n X - ${err}`))
}


//SEED FUNCTIONS
async function seedBilans(contracts : Contracts){
    const result = emptySeedResult();
    let qcmsCreated = 0;
    let qcmsSkipped = 0;

    for(const contract of contracts){
        if(!contract.animatorId || !contract.scolarYearId || !contract.class) continue;

        const {animatorId, scolarYearId, class : cls} = contract;
        
        const eligibleStudents = cls.students.filter(s => s.level && s.level.lessons.length > 0);

        if(eligibleStudents.length === 0){
            console.log(`⚠ ${cls.label} : No eligible students for seeding bilans`);
            continue;
        }
        
        
        const dates = generateSeanceDates(CONFIG.bilans.bilansPerStudent, CONFIG.bilans.weeksBetween);
        console.log(`⚠ ${cls.label} : ${eligibleStudents.length} students - ${dates.length} seances`);
        for(const date of dates){
            try{
                const {gte, lt} = dayRange(date);
                const existing = await prisma.seance.findFirst({
                    where : {
                        scolarYearId,
                        animatorId,
                        classId : cls.id,
                        date : {gte, lt}
                    },
                    select : {id : true}
                })
                
                const seanceId = existing
                ? existing.id
                : (await prisma.seance.create({
                    data : {
                        animatorId,
                        classId : cls.id,
                        date,
                        scolarYearId
                    },
                    select : {id : true}
                })).id
                
                const bilansData = eligibleStudents.map(s => {
                    const isPresent = Math.random() > CONFIG.bilans.absencePct;
                    
                    if(isPresent){
                        return {
                            submittedById : animatorId,
                            studentId : s.id,
                            seanceId, 
                            presence : true,
                            lessonId : pickRandom(s.level!.lessons).id,
                            summary : pickRandom(SUMMARIES),
                            date,
                        }
                    }
                    
                    return {
                        submittedById : animatorId,
                        studentId : s.id,
                        seanceId, 
                        presence : false,
                        date,
                    }
                })
                
                const bilans = await prisma.bilan.createManyAndReturn({data : bilansData, skipDuplicates : true,});
                
                result.created += bilans.length;
                result.skipped += eligibleStudents.length - bilans.length;

                const presentBilans = bilans.filter(bilan => bilan.presence);

                for (let i = 0; i < presentBilans.length; i++) {
                    const bilan = presentBilans[i]!;
                    const qcm = await generateQcmForBilan(bilan.id, bilan.studentId, bilan.lessonId!);
                    if(qcm) qcmsCreated++;
                    else qcmsSkipped++;
                }

            }catch(err){
                result.errors.push(`${cls.label}  | ${date.toDateString()} : ${String(err)}`)
            }
        }
    }

    return result;
}

async function seedLessonEvals(contracts : Contracts){
    const result = emptySeedResult();

    for(const contract of contracts){
        if(!contract.animatorId || !contract.scolarYearId || !contract.class) continue;

        const {animatorId, scolarYearId, class : cls} = contract;
        
        const eligibleStudents = cls.students.filter(s => s.level && s.level.lessons.length > 0);

        if(eligibleStudents.length === 0){
            console.log(`⚠ ${cls.label} : No eligible students for seeding lesson evals`);
            continue;
        }
    
        console.log(`⚠ ${cls.label} : ${eligibleStudents.length} students`);
        
        for(const student of eligibleStudents){
            try{
                const lessons = student.level!.lessons;

                const lessonsBySubject = new Map<number, {label : string, lessons : typeof lessons}>();
                for(const lesson of lessons){
                    const existing = lessonsBySubject.get(lesson.subject.id);
                    if(existing){existing.lessons.push(lesson)}
                    else {
                        lessonsBySubject.set(lesson.subject.id, {label : lesson.subject.label, lessons : [lesson]})
                    }
                }

                const subjects = Array.from(lessonsBySubject.values());

                if(subjects.length < CONFIG.lessonEvals.subjectsPerStudent) {
                    result.errors.push(
                        `${student.firstName} ${student.lastName}: ` +
                        `${subjects.length} subject(s) available, ${CONFIG.lessonEvals.subjectsPerStudent} required. ` +
                        `Lower CONFIG.lessonEvals.subjectsPerStudent or add more lessons to this level.`
                    )
                    continue;
                }
                
                //shuffle subjects then pick a number by slicing and dicing
                const selectedSubjects = shuffle(subjects).slice(0, CONFIG.lessonEvals.subjectsPerStudent);

                const rows = selectedSubjects.flatMap(subject => {
                    const lessonCount = Math.min(CONFIG.lessonEvals.lessonsPerSubject, subject.lessons.length);

                    return shuffle(subject.lessons).slice(0, lessonCount).map(lesson => ({
                        studentId : student.id,
                        submittedById : animatorId,
                        lessonId : lesson.id,
                        evaluation : pickRandom(LESSON_EVALS) as LessonEval
                    }))
                });

                const {count} = await prisma.lessonEvaluation.createMany({data : rows, skipDuplicates : true});

                result.created += count;
                result.skipped += rows.length - count;
                
            }catch(err){
                result.errors.push(`${student.firstName} ${student.lastName}: ${String(err)}`)
            }
        }
    }
    
    return result;
}

async function seedSkillEvals(contracts : Contracts){
    const result = emptySeedResult();
    
    const skillEvalRows = contracts.flatMap(contract => {
        if(!contract.animatorId || !contract.scolarYearId || !contract.class) return [];
        
        const {animatorId, class : cls} = contract;
        
        const eligibleStudents = cls.students.filter(s => s.level && s.level.lessons.length > 0);
        
        if(eligibleStudents.length === 0){
            console.log(`⚠ ${cls.label} : No eligible students for seeding lesson evals`);
            return [];
        }
        
        console.log(`⚠ ${cls.label} : ${eligibleStudents.length} students`);
        
        return eligibleStudents.map(student => ({
            animatorId,
            studentId : student.id,
            autonomy : pickSkillValue(),
            discipline : pickSkillValue(),
            organisation : pickSkillValue(),
            ponctuality : pickSkillValue(),
            preparation : pickSkillValue(),
            regularity : pickSkillValue(),
            respect : pickSkillValue(),
            positive : pickRandom(SKILL_POSITIVES),
            negative : pickRandom(SKILL_NEGATIVES),
            improvements : pickRandom(SKILL_IMPROVEMENTS),
        }))
    })
    
    const {count} = await prisma.skill.createMany({data : skillEvalRows, skipDuplicates : true});
    
    result.created += count;
    result.skipped += skillEvalRows.length - count;

    return result;
}


async function clearLessonEvals(){
    const result = await prisma.lessonEvaluation.deleteMany({});
    
    console.log(`lessonEvals : ${result.count} deleted`);
}

async function clearSkillEvals(){
    const result = await prisma.skill.deleteMany({});
    
    console.log(`skillEvals : ${result.count} deleted`);

}

async function clearBilans(){
    const [bilansResult, seancesResult] = await prisma.$transaction([
        prisma.bilan.deleteMany({}),
        prisma.seance.deleteMany({})
    ])
    
    console.log(`bilans : ${bilansResult.count} deleted`);
    console.log(`seannces : ${seancesResult.count} deleted`);
}



//MAIN
async function main(){
    const args = parseArgs();

    console.log(`\n ${args.clear? "Clearing data ..." : "Seeding data ..."}`);
    
    if(args.clear){
        if(args.bilans){
            console.log(`\n [bilans + seances] ...`);
            await clearBilans();
        }

        if(args.lessonEvals){
            console.log(`\n Lesson Evals ...`);
            await clearLessonEvals();
        }

        if(args.skillEvals){
            console.log(`\n Skill Evals ...`);
            await clearSkillEvals();
        }

        return;
    }
    
    console.log(`\n Loading contracts ...`);
    const contracts  = await loadContracts();

    if(contracts.length === 0){
        console.log(`\n No contracts found, seed contracts first.`);
        return;
    }
    
    console.log(`\n Existing contracts found : ${contracts.length}`);
    
    const results : Record<string, SeedResult> = {};
    
    if(args.bilans){
        console.log(`\n Seeding seances + bilans ...`);
        results['bilans'] = await seedBilans(contracts);
    }

    if(args.lessonEvals){
        console.log(`\n Seeding lessonEvals ...`);
        results['lessonEvals'] = await seedLessonEvals(contracts);
    }

    if(args.skillEvals){
        console.log(`\n Seeding skillEvals ...`);
        results['skillEvals'] = await seedSkillEvals(contracts);
    }
    
    
    
    //logging results
    console.log(`\n`+"=".repeat(50));
    console.log(`SEEDING SUMMARY`)
    console.log("=".repeat(50));

    for(const [label, result]  of Object.entries(results)){
        printSeedResult(label, result);
    }


    console.log(` DONE ! `)

}

main()
    .catch(e => {
        console.log(`\n Fatal error`, e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect())