// React
import { useState, useEffect, useRef } from "react"

// Deps
import { useMediaQuery } from 'usehooks-ts'

const Card = ({ nome, età, lavoro, distanza, immagine, onFinish, shadow=true, isActive=false }) => {

    const isMobile = useMediaQuery('(max-width: 768px)')

    // Handling Tools
    const card = useRef(null)
    const [ isDragging, setIsDragging ] = useState(false)
    const mousePosition = useRef(null)
    const touchPosition = useRef(null)

    const DRAG_INTERVAL = 50
    const DRAG_Y_SCALE = 50

    // Decorations
    const [ cardState, setCardState ] = useState(0)

    const offsetNeutral = 25

    useEffect(() => {
        const setMousePosition = (e) => mousePosition.current = { x: e.clientX, y: e.clientY }
        const setTouchPosition = (e) => touchPosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }

        if (!isMobile) {
            window.addEventListener('mouseup', () => setIsDragging(false))
            window.addEventListener('mousemove', setMousePosition)
        } else {
            window.addEventListener('touchend', () => setIsDragging(false))
            window.addEventListener('touchmove', setTouchPosition)
        }
        return () => {
            window.removeEventListener('mouseup', () => setIsDragging(false))
            window.removeEventListener('mousemove', setMousePosition)
            window.addEventListener('touchend', () => setIsDragging(false))
            window.addEventListener('touchmove', setTouchPosition)
        }
    })

    const lose = () => {
        card.current.style.transform = `translate(-100vw, 0px) rotate(-45deg)`
        onFinish(false)
    }

    const win = () => {
        card.current.style.transform = `translate(100vw, 0px) rotate(45deg)`
        onFinish(true)
    }

    const resetCardPosition = () => {
        card.current.style.transform = ``
    }

    const handleDrag = () => {
        const position = !isMobile ? mousePosition.current : touchPosition.current
        if (!position) return
        const { x } = position
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
        if (!isDragging) {
            if (cardState === 0) isActive ? resetCardPosition() : ''
            else if (cardState === 1) win()
            else if (cardState === -1) lose()
        }
    }, [ isDragging ])

    useEffect(() => {
        if (!isDragging) return
        const interval = setInterval(handleDrag, DRAG_INTERVAL)
        return () => clearInterval(interval)
    }, [ isDragging ])

    return (
        <div
            ref={ card }
            onMouseDown={ () => !isMobile && isActive ? setIsDragging(true) : '' }
            onTouchStart={ () => isMobile && isActive ? setIsDragging(true) : '' }
            className="min-w-[350px] space-y-5 transition-all"
        >
            <div className={`relative w-full h-[550px] rounded-lg overflow-hidden ${ shadow ? 'shadow-xl' : '' }`}>
                <div className={`absolute z-40 w-full h-full transition-all flex justify-center items-center duration-500 ${ cardState !== 0 ? 'backdrop-blur-lg' : '' } ${ cardState === -1 ? 'bg-[#a0121250]' : cardState === 1 ? 'bg-[#37e94650]' : '' }`}>
                    <span className="text-5xl font-bold text-white tracking-wide">{ cardState === 1 ? 'SMASH' : cardState === -1 ? 'PASS' : '' }</span>
                </div>
                <div className="absolute bottom-0 left-0 z-30 pl-3 pb-7 text-white">
                    <div className="space-x-3">
                        <span className="font-bold text-4xl">{ nome }</span>
                        <span className="font-light text-xl">{ età }</span>
                    </div>
                    <span className="block">{ lavoro }</span>
                    <span className="block">{ distanza }km distanza</span>
                </div>
                <div className="w-full h-1/3 bg-gradient-to-t from-[#00000090] absolute bottom-0 z-20"></div>
                <img className="absolute w-full h-full object-cover bottom-0 left-1/2 -translate-x-1/2 z-10" onDragStart={ (e) => e.preventDefault() } src={ immagine } alt="dating-person" />
            </div>
        </div>
    )
}

export default Card