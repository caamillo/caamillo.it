// React
import { useEffect } from "react"
import Head from "next/head";

// Deps
import prisma from '@/lib/prisma'

const getTimeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
  
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
  
    if (years > 0) return years === 1 ? "a year ago" : `${ years } years ago`
    else if (months > 0) return months === 1 ? "a month ago" : `${ months } months ago`
    else if (days > 0) return days === 1 ? "a day ago" : `${ days } days ago`
    else if (hours > 0) return hours === 1 ? "an hour ago" : `${ hours } hours ago`
    else if (minutes > 0) return minutes === 1 ? "a minute ago" : `${ minutes } minutes ago`
    else return "now"
  }

export default function Bodycounts({ bodycount }) {

    useEffect(() => {
        document.querySelector('body').style.background = '#352F44'
    }, [])

    return (
        <div className="w-screen h-screen flex flex-col justify-between items-center relative bg-[#352F44] text-[#FAF0E6]">
            <Head>
                <title>Bodycounts</title>
                <meta name="title" content="Bodycounts" />
                <meta name="description" content="A useless site for keeping track of bodycounts" />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://caamillo.it/bodycounts" />
                <meta property="og:title" content="Bodycounts" />
                <meta property="og:description" content="A useless site for keeping track of bodycounts" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://caamillo.it/bodycounts/" />
                <meta property="twitter:title" content="Bodycounts" />
                <meta property="twitter:description" content="A useless site for keeping track of bodycounts" />
            </Head>
            <p className="mt-3 text-lg tracking-wider font-medium">Bodycounts</p>
            <div className='h-[100px] w-[200px] flex items-center justify-center relative overflow-hidden'>
                <div className={`absolute top-0 left-1/2 text-center ${ Object.keys(bodycount).length > 0 ? 'cels' : '-translate-x-1/2' }`}>
                    {
                        Array.from({ length: (bodycount.value || 0) + 1 }).map((_, c) =>
                            <span className="text-8xl font-bold block">{ c }</span>
                        )
                    }
                </div>
            </div>
            <p className="text-center mb-3 text-[#B9B4C7]">Last update: <span className='font-bold block sm:inline'>{ Object.keys(bodycount).length > 0 ? getTimeAgo(new Date(bodycount.createdAt)) : 'never' }</span></p>
        </div>
    )
}

export async function getServerSideProps() {
    const bodycounts = await prisma.bodycount.findMany({})

    if (!bodycounts.length) return {
        props: {
            bodycount: {}
        }
    }

    const bodycount = bodycounts.reduce((prev, curr) =>
        curr.createdAt > prev.createdAt ? curr : prev
    )

    return {
        props: {
            bodycount: JSON.parse(JSON.stringify(bodycount))
        },
    }
}