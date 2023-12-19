// React
import { useEffect } from "react"

export default function Placeholder({ children, loaded, width="100%" }) {

    return (
        <div className="relative">
            <div style={{ opacity: loaded.done ? 1 : 0 }} className="transition-opacity duration-1000">{ children }</div>
            <div style={{ opacity: loaded.done ? 0 : 1, width: width }} className={`transition-opacity duration-1000 absolute h-full top-0 bg-gray-400 rounded-md ${ !loaded.done ? 'animate-pulse' : '' }`}></div>
        </div>
    )
}