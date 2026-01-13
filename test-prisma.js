// test-prisma.js
import {prisma} from "./lib/prisma.js";

async function test() {
    try {
        console.log('Testing Prisma connection...');
        console.log('Available models:', Object.keys(prisma));
        
        // Try to query (this should work even if table is empty)
        const count = await prisma.location.count();
        console.log('Location count:', count);
        console.log('✅ Prisma is working!');
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

test();