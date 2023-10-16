// React
import { useEffect } from "react"

export default function Bodycounts() {

    useEffect(() => {
        document.querySelector('body').style.background = '#352F44'
    }, [])

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center relative bg-[#352F44] text-[#FAF0E6]">
            <p className="fixed top-0 left-1/2 -translate-x-1/2 mt-3 text-lg tracking-wider font-medium">Femboy RoadTrip</p>
            <p className="text-lg font-medium">Bodycounts:</p>
            <span className="text-8xl font-bold mt-3">1</span>
            <p className="fixed bottom-0 left-1/2 -translate-x-1/2 mb-3 text-[#B9B4C7]">Last update: now</p>
        </div>
    )
}
