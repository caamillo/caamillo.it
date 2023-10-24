// React
import { useState,useEffect } from "react"

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

    useEffect(() => {
        if (!cards) return
        console.log(cards)
        setCurrCard(cards[0]?.id)
    }, [cards])

    useEffect(() => {
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
        if (won) setSmashs(smashs => [ ...smashs, cards[0] ])
        else setPasses(passes => [ ...passes, cards[0] ])
        
        fetch('/api/bosica/getppl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                smashs: smashs,
                passes: passes,
                stack: cards,
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
        <main className="w-screen h-screen flex justify-center relative items-center bg-[#e7e7e7] select-none overflow-hidden">
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
        </main>
    )
}