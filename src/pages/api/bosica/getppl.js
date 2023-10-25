import { PrismaClient } from '@prisma/client';

export default async (req, res) => {
    if (req.method !== 'POST') return res.stats(405).end()

    const { smashs, passes, limit, stack, take } = req.body
    const prisma = new PrismaClient()

    try {
        if (!take) {
            const people = await prisma.bosica.findMany({
                where: {
                    id: {
                        notIn: [ ...smashs, ...passes, ...stack ?? '' ]
                    },
                },
                take: limit
            })
            res.status(200).json(people)
        } else {
            const smashed = await prisma.bosica.findMany({
                where: {
                    id: {
                        in: [ ...take.smashs ]
                    }
                }
            })
            const passed = await prisma.bosica.findMany({
                where: {
                    id: {
                        in: [ ...take.passes ]
                    }
                }
            })
            res.status(200).json({
                smashs: smashed,
                passes: passed
            })
        }
    } finally {
        await prisma.$disconnect()
    }
}