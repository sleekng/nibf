// Simple script to check database connection
const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Checking database connection...');
    
    // Try to connect to the database
    await prisma.$connect();
    console.log('✅ Database connection successful!');
    
    // Count users
    const userCount = await prisma.user.count();
    console.log(`Found ${userCount} users in the database`);
    
    // List all users
    if (userCount > 0) {
      const users = await prisma.user.findMany();
      console.log('Users:');
      users.forEach(user => {
        console.log(`- ${user.firstName} ${user.lastName} (${user.email})`);
      });
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  }); 