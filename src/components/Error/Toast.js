// React
import { useEffect } from "react"

export default function Toast({ className, title, desc, idx }) {
    
    return (
        <div className={ `w-full transition-all absolute bottom-0 right-0 ` + className }>
            <div className="w-full bg-red-300 p-1">
                <span className="">{ title }</span>
            </div>
            <div className="w-full p-3 px-1 bg-red-400">
                { desc }
            </div>
        </div>
    )
}