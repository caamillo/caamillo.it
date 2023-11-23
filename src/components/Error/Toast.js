// React
import { useEffect } from "react"

export default function Toast({ className, title, desc, idx }) {
    
    return (
        <div className={ `w-full transition-all absolute bottom-0 right-0 ` + className }>
            <div className="w-full bg-red-300 p-1 h-[32px]">
                <span className="">{ title?.length >= 35 ? title.split('').splice(0, 35).join('') + '...' : title }</span>
            </div>
            <div className="w-full p-3 px-1 bg-red-400 break-words h-[70px] cursor-pointer pointer-events-auto">
                { desc?.length >= 65 ? desc.split('').splice(0, 65).join('') + '...' : desc }
            </div>
        </div>
    )
}