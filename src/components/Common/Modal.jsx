// React
import { useState, useEffect } from "react"

// Deps
import { useMediaQuery } from "usehooks-ts"

export default function Modal({ modalRef, className, children }) {

    const isMobile = useMediaQuery('(max-width: 768px)')

    useEffect(() => {
        if (!isMobile) document.querySelector(':root').style.setProperty('--modal-y', '-160%')
        else document.querySelector(':root').style.setProperty('--modal-y', '-80vh')
    }, [ isMobile ])

    return (
        <div ref={ modalRef } data-show="false" className={`modal-warning w-full h-full fixed top-0 left-0 duration-500 z-[999999] transition-all ${ className }`}>
            <div className='absolute -translate-y-1/2 md:translate-y-0 top-1/2 md:top-0 left-1/2 -translate-x-1/2 container flex justify-center'>
                <div className='warning-modal transition-transform duration-1000 ease-in-out bg-white w-full lg:w-2/3 xl:w-1/2 p-5 rounded-lg md:mt-10 mx-3 border-2 border-slate-300 flex flex-col items-center text-center'>
                    { children }
                </div>
            </div>
        </div>
    )
}