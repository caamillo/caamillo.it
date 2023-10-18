import { useState, useEffect, useRef } from "react"

export default function BadgeScroller({ children }) {

    const [ isRightEnd, setIsRightEnd ] = useState(false)
    const [ isLeftEnd, setIsLeftEnd ] = useState(true)
    const scrollRef = useRef()

    const handleScroll = (e) => {
        if (e.target.scrollLeft <= 0) setIsLeftEnd(true)
        else setIsLeftEnd(false)

        if (e.target.scrollLeft + e.target.offsetWidth >= e.target.scrollWidth - 1) setIsRightEnd(true)
        else setIsRightEnd(false)
    }

    useEffect(() => {
        if (isLeftEnd) scrollRef.current.classList.add('left-end')
        else scrollRef.current.classList.remove('left-end')

        if (isRightEnd) scrollRef.current.classList.add('right-end')
        else scrollRef.current.classList.remove('right-end')
    }, [ isRightEnd, isLeftEnd ])

    return (
        <div className="relative badge-scroll">
            <div className={`absolute top-0 left-0 bg-gradient-to-r from-white h-full w-[3rem] transition-all ${ isLeftEnd ? 'opacity-0 pointer-events-none' : '' }`}></div>
            <div ref={ scrollRef } onScroll={ handleScroll } className="flex overflow-x-scroll gap-1 mb-3 hide-scrollbars">
                { children }
            </div>
            <div className={`absolute top-0 right-0 bg-gradient-to-l from-white h-full w-[3rem] transition-all ${ isRightEnd ? 'opacity-0 pointer-events-none' : '' }`}></div>
        </div>
    )
}