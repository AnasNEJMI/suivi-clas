import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg';
import {PrismaClient} from '../src/generated/prisma/client.js'
import { SEANCE_DURATION_LABELS, SEANCE_DURATIONS } from '../src/db/seed.users.data.js';

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });


// ─────────────────────────────────────────────
// SEANCE DURATIONS
// ─────────────────────────────────────────────
async function seedSeanceDurations(): Promise<void> {
  console.log(`Seeding seance durations → "${SEANCE_DURATION_LABELS.length}"`);

  const seanceDurationsData = SEANCE_DURATION_LABELS.map(label => ({label, durationMin : SEANCE_DURATIONS[label]}))
  
  const seanceDurations = await prisma.seanceDuration.createManyAndReturn({data : seanceDurationsData});
  
  if(!seanceDurations ){
    throw new Error(`Error creating seance durations`);
  }

  console.log(`seance durations seeded successfully : ${seanceDurations.length} durations`)
}

async function main(): Promise<void> {
    await seedSeanceDurations();
}

main()
  .catch((e) => {
    console.error("\n❌ Seed des durées de seance échoué :", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());