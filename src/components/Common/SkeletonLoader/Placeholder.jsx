// React
import { useEffect, useRef } from "react"

export default function Placeholder({ children, loaded }) {

    const childrenRef = useRef()

    return (
        <div className="relative">
            <div ref={ childrenRef } style={{ opacity: loaded.done ? 1 : 0 }} className="transition-opacity duration-1000">{ children }</div>
            <div style={{ opacity: loaded.done ? 0 : 1, width: `${ childrenRef.current?.firstChild.offsetWidth }px` }} className={`transition-opacity duration-1000 absolute h-full top-0 bg-gray-400 rounded-md ${ !loaded.done ? 'animate-pulse' : '' }`}></div>
        </div>
    )
}