import { PrismaClient } from '@prisma/client';

export default async (req, res) => {
    if (req.method !== 'POST') return res.stats(405).end()

    const { smashs, passes, limit, stack } = req.body
    const prisma = new PrismaClient()

    try {
        const people = await prisma.bosica.findMany({
            where: {
                id: {
                    notIn: [ ...smashs, ...passes, ...stack ?? '' ].map(el => el.id)
                },
            },
            take: limit
        })

        res.status(200).json(people)
    } finally {
        await prisma.$disconnect()
    }
}