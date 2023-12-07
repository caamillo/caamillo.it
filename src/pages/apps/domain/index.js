// React
import { useContext, useEffect, useRef } from "react"

// Utils
import { avoidIllegalCharacters } from "@/utils/domain"

export default function Domain() {

    const searchRef = useRef()

    useEffect(() => {
        document.body.classList.add('bg-slate-300')
    }, [])

    return (
        <div className="w-full flex justify-center">
            <div className="w-full flex flex-col items-center container">
                <div className="xl:w-1/2 w-full h-[70px] p-2 rounded-md bg-slate-100 relative shadow-md">
                    <input onKeyDown={ avoidIllegalCharacters } ref={ searchRef } placeholder="Search for a domain..." className="w-full h-full placeholder:text-slate-400 placeholder:font-normal text-slate-600 font-medium rounded-md outline-none px-3 pr-14 bg-slate-200 text-2xl" />
                    <img src="/icons/Apps/search.svg" className="absolute top-1/2 -translate-y-1/2 right-5 w-[30px] cursor-pointer" />
                </div>
            </div>
        </div>
    )
}