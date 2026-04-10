import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@commitforge.app" },
    update: {},
    create: {
      email: "demo@commitforge.app",
      name: "Forge Demo",
      settings: {
        create: {
          preferredTheme: "dark"
        }
      }
    }
  });

  const existing = await prisma.goal.count({ where: { userId: user.id } });
  if (existing > 0) {
    return;
  }

  const seeds = [
    {
      title: "Build elite endurance",
      reason: "I want my body to feel trustworthy under pressure and recover faster.",
      timeline: "90 days",
      outcome: "Run a half marathon without walking",
      tasks: [
        "Complete three zone 2 runs this week",
        "Finish one interval session",
        "Log one long run",
        "Do two mobility sessions"
      ]
    },
    {
      title: "Ship CommitForge",
      reason: "I want to prove I can turn a sharp product idea into a premium launch.",
      timeline: "by Aug 31 2026",
      outcome: "Launch v1 with 100 active users",
      tasks: [
        "Refine dashboard interactions",
        "Close one onboarding UX gap",
        "Interview one user",
        "Publish one product update"
      ]
    },
    {
      title: "Master strategic writing",
      reason: "Clear writing sharpens my thinking and amplifies my career.",
      timeline: "ongoing",
      outcome: "Publish 24 thoughtful essays",
      tasks: [
        "Draft one essay outline",
        "Write 500 words",
        "Edit one draft",
        "Publish one insight post"
      ]
    },
    {
      title: "Deepen family rituals",
      reason: "I want the people I love to feel deliberately prioritized.",
      timeline: "6 months",
      outcome: "Hold 20 intentional family evenings",
      tasks: [
        "Plan one family dinner",
        "Schedule one no-phone evening",
        "Prepare one shared activity",
        "Capture one memory note"
      ]
    },
    {
      title: "Read with range",
      reason: "I want more original inputs shaping how I think and decide.",
      timeline: "12 months",
      outcome: "Read 30 books across 5 disciplines",
      tasks: [
        "Read 40 pages",
        "Write one chapter summary",
        "Share one idea from reading",
        "Finish one book"
      ]
    }
  ];

  for (const seed of seeds) {
    await prisma.goal.create({
      data: {
        userId: user.id,
        title: seed.title,
        reason: seed.reason,
        timeline: seed.timeline,
        outcome: seed.outcome,
        tasks: {
          create: seed.tasks.map((description, index) => ({
            description,
            completed: index < 2,
            completedAt: index < 2 ? new Date() : null
          }))
        }
      }
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
