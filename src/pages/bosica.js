// React
import { useState, useEffect, useRef } from "react"
import Head from "next/head"

// Deps
import prisma from "@/lib/prisma"
import { useLocalStorage } from "usehooks-ts"

// Components
import Stack from "@/components/Bosica/Stack"
import Card from "@/components/Bosica/Card"

const CHUNK_WRAPPER = 6

export default function Bosica() {

    const [cards, setCards] = useState([])
    const [currCard, setCurrCard] = useState()
    const [smashs, setSmashs] = useLocalStorage('smashs', [])
    const [passes, setPasses] = useLocalStorage('passes', [])
    const [smashCards, setSmashCards] = useState([])
    const [passCards, setPassCards] = useState([])
    const reloadBtn = useRef()

    useEffect(() => {
        if (!cards.length) {
            if (reloadBtn.current && (smashs.length || passes.length)) {
                reloadBtn.current.removeAttribute('data-hidden')
                fetch('/api/bosica/getppl', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        take: {
                            smashs: smashs,
                            passes: passes
                        }
                    })
                })
                    .then(res => res.json())
                    .then(({ smashs, passes }) => {
                        setSmashCards(smashs)
                        setPassCards(passes)
                    })
            }
            return
        }
        if (reloadBtn.current) reloadBtn.current.setAttribute('data-hidden', '')
        setCurrCard(cards[0]?.id)
    }, [cards])

    useEffect(() => {
        document.body.style.background = '#e7e7e7'
        fetch('/api/bosica/getppl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                smashs: smashs,
                passes: passes,
                limit: CHUNK_WRAPPER
            })
        })
            .then(res => res.json())
            .then(data => setCards(data))
    }, [])

    const onFinish = (won) => {
        if (won) setSmashs(smashs => [ ...smashs, cards[0].id ])
        else setPasses(passes => [ ...passes, cards[0].id ])
        
        fetch('/api/bosica/getppl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                smashs: smashs,
                passes: passes,
                stack: cards.map(el => el.id),
                limit: 1
            })
        })
            .then(res => res.json())
            .then(data => setCards(cards => [ ...cards, ...data ]))

        setTimeout(() => {
            setCards(cards => cards.slice(1))
        }, 100)
    }

    return (
        <main className="w-screen min-h-screen py-5 flex justify-center relative items-center bg-[#e7e7e7] select-none overflow-hidden">
            <Head>
                <title>Bosica</title>
                <meta name="title" content="Bosica" />
                <meta name="description" content="Recreating a tinder-like system" />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://caamillo.it/bosica/" />
                <meta property="og:title" content="Bosica" />
                <meta property="og:description" content="Recreating a tinder-like system" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://caamillo.it/bosica/" />
                <meta property="twitter:title" content="Bosica" />
                <meta property="twitter:description" content="Recreating a tinder-like system" />
            </Head>
            <Stack>
                {
                    cards.map(({ id, nome, eta, lavoro, distanza, img }) =>
                        <Card
                            nome={ nome }
                            età={ eta }
                            lavoro={ lavoro }
                            distanza={ distanza }
                            immagine={ img }
                            isActive={ id === currCard }
                            onFinish={ onFinish }
                            key={ 'card-' + id }
                        />
                    )
                }
            </Stack>
            {
                !cards.length > 0 && (!!smashCards.length || !!passCards.length) &&
                <div className="container space-y-10 mb-20">
                    <div>
                        <h2 className="text-2xl font-medium mb-3 text-slate-700">Smashed</h2>
                        <div className="flex space-x-5 overflow-x-scroll pb-3">
                            {
                                smashCards?.map(({ id, nome, eta, lavoro, distanza, img }) =>
                                    <Card
                                        nome={ nome }
                                        età={ eta }
                                        lavoro={ lavoro }
                                        distanza={ distanza }
                                        immagine={ img }
                                        onFinish={ onFinish }
                                        shadow={ false }
                                        key={ 'card-sm-' + id }
                                    />
                                )
                            }
                            {
                                !smashCards.length &&
                                <p>(No one)</p>
                            }
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-medium mb-3 text-slate-700">Passed</h2>
                        <div className="flex space-x-5 overflow-x-scroll pb-3">
                            {
                                passCards?.map(({ id, nome, eta, lavoro, distanza, img }) =>
                                    <Card
                                        nome={ nome }
                                        età={ eta }
                                        lavoro={ lavoro }
                                        distanza={ distanza }
                                        immagine={ img }
                                        onFinish={ onFinish }
                                        shadow={ false }
                                        key={ 'card-sm-' + id }
                                    />
                                )
                            }
                            {
                                !passCards.length &&
                                <p>(No one)</p>
                            }
                        </div>
                    </div>
                </div>
            }
            <button ref={ reloadBtn } onClick={() => {
                setSmashs([])
                setPasses([])
                fetch('/api/bosica/getppl', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        smashs: [],
                        passes: [],
                        limit: CHUNK_WRAPPER
                    })
                })
                    .then(res => res.json())
                    .then(data => setCards(data))
            }} data-hidden className="bg-slate-400 text-slate-100 px-5 py-2 rounded-md font-medium text-xl
            absolute bottom-5 left-1/2 -translate-x-1/2 shadow-xl cursor-pointer transition-all data-[hidden]:opacity-0 data-[hidden]:pointer-events-none data-[hidden]:translate-y-10 ease-in-out duration-500">Reload</button>
        </main>
    )
}