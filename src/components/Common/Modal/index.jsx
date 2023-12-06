// React
import { useState, useEffect } from "react"

// Deps
import { useMediaQuery } from "usehooks-ts"

export default function Modal({ modalRef, className, children, defaultShow="false" }) {

    const isMobile = useMediaQuery('(max-width: 768px)')

    useEffect(() => {
        if (!isMobile) document.querySelector(':root').style.setProperty('--modal-y', '-160%')
        else document.querySelector(':root').style.setProperty('--modal-y', '-80vh')
    }, [ isMobile ])

    return (
        <div ref={ modalRef } data-show={ defaultShow } className={`modal-warning w-full h-full fixed top-0 left-0 z-[100] duration-500 transition-all ${ className }`}>
            <div className='absolute -translate-y-1/2 md:translate-y-0 top-1/2 md:top-0 left-1/2 -translate-x-1/2 container flex justify-center'>
                { children }
            </div>
        </div>
    )
}