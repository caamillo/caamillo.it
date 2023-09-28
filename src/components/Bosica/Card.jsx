// React
import { useState, useEffect, useRef } from "react"

const Card = ({ nome, età, lavoro, distanza, immagine }) => {

    // Handling Tools
    const card = useRef(null)
    const [ isDragging, setIsDragging ] = useState(false)
    const mousePosition = useRef(null)

    const DRAG_INTERVAL = 50
    const DRAG_Y_SCALE = 50

    // Decorations
    const [ cardState, setCardState ] = useState(0)

    const offsetNeutral = 25

    useEffect(() => {
        const setMousePosition = (e) => mousePosition.current = { x: e.clientX, y: e.clientY }

        window.addEventListener('mouseup', () => setIsDragging(false))
        window.addEventListener('mousemove', setMousePosition)
        return () => {
            window.removeEventListener('mouseup', () => setIsDragging(false))
            window.removeEventListener('mousemove', setMousePosition)
        }
    })

    const lose = () => {
        card.current.style.transform = `translate(-100vw, 0px) rotate(-45deg)`
    }

    const win = () => {
        card.current.style.transform = `translate(100vw, 0px) rotate(45deg)`
    }

    const resetCardPosition = () => {
        card.current.style.transform = `translate(0px, 0px) rotate(0deg)`
    }

    const handleDrag = () => {
        const { x } = mousePosition.current
        const distanceX = x - window.innerWidth / 2
        const scaleY = ((window.innerHeight / 2) * DRAG_Y_SCALE) / 100
        const distanceY = Math.abs((distanceX * scaleY) / (window.innerWidth / 2))
        card.current.style.transform = `translate(${ distanceX }px, ${ distanceY }px) rotate(${ (distanceX * 90) / (window.innerWidth / 2) }deg)`

        const distanceOffset = ((window.innerWidth / 2) * offsetNeutral) / 100

        if (distanceX > distanceOffset) setCardState(1)
        else if (distanceX < -distanceOffset) setCardState(-1)
        else setCardState(0)
    }

    useEffect(() => {
        if (isDragging) return
        if (cardState === 0) return resetCardPosition()
        if (cardState === 1) return win()
        if (cardState === -1) return lose()
    }, [ isDragging ])


    useEffect(() => {
        if (!isDragging) return
        const interval = setInterval(handleDrag, DRAG_INTERVAL)
        return () => clearInterval(interval)
    }, [ isDragging ])

    return (
        <div ref={ card } onMouseDown={ () => setIsDragging(true) } className="w-[350px] space-y-5 transition-transform">
            <div className="relative w-full h-[550px] rounded-lg overflow-hidden shadow-xl">
                <div className={`absolute z-40 w-full h-full transition-all flex justify-center items-center duration-500 ${ cardState !== 0 ? 'backdrop-blur-lg' : '' } ${ cardState === -1 ? 'bg-[#a0121250]' : cardState === 1 ? 'bg-[#37e94650]' : '' }`}>
                    <span className="text-5xl font-bold text-white tracking-wide">{ cardState === 1 ? 'SMASH' : cardState === -1 ? 'PASS' : '' }</span>
                </div>
                <div className="absolute bottom-0 left-0 z-30 pl-3 pb-7 text-white">
                    <div className="space-x-3">
                        <span className="font-bold text-4xl">{ nome }</span>
                        <span className="font-light text-xl">{ età }</span>
                    </div>
                    <span className="block">{ lavoro }</span>
                    <span className="block">{ distanza } distanza</span>
                </div>
                <div className="w-full h-1/3 bg-gradient-to-t from-[#00000090] absolute bottom-0 z-20"></div>
                <img className="absolute w-full h-full object-cover bottom-0 left-1/2 -translate-x-1/2 z-10" onDragStart={ (e) => e.preventDefault() } src={ immagine } alt="dating-person" />
            </div>
        </div>
    )
}

export default Card