const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                { name: "Famous People", },
                { name: "Movies & TV", },
                { name: "Musicians", },
                { name: "Politicians", },
                { name: "Games", },
                { name: "Animals", },
                { name: "Books", },
                { name: "Anime & Manga", },
                { name: "Comics", },
                { name: "Philosophers", },
                { name: "Scientists", },
            ]
        })

        console.log("created categories");

    } catch (error) {
        console.error("Error seeding default categories", error);
    } finally {
        await db.$disconnect();
    }
}

main();