import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function makeAdmin(email: string) {
  const user = await prisma.user.update({
    where: { email: email.toLowerCase().trim() },
    data: { role: 'ADMIN' },
  });

  console.log(`Success! User "${user.fullName}" (${user.email}) is now an ADMIN.`);
  console.log('\nPlease log out and log back in to get a new session with admin privileges.');
}

// Get email from command line argument
const email = process.argv[2];

if (!email) {
  console.error('Usage: npx tsx scripts/make-admin.ts <email>');
  console.error('Example: npx tsx scripts/make-admin.ts admin@example.com');
  process.exit(1);
}

makeAdmin(email)
  .catch((error) => {
    if (error.code === 'P2025') {
      console.error(`Error: No user found with email "${email}"`);
    } else {
      console.error('Error:', error.message);
    }
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
