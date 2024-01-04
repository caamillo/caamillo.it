import { useEffect, useState, useRef } from "react"

export default function Popover({ isOpen=false, setIsOpen, name="", offset={ x: 0 }, options=[] }) {

    const [ left, setLeft ] = useState(true)
    const popoverRef = useRef()
    const SELECTION_OFFSET = 10

    const onScreenChange = () => {
        const { x } = popoverRef.current.getBoundingClientRect()
        if (x >= window.innerWidth / 2) setLeft(false)
        else setLeft(true)
    }

    useEffect(() => {
        const onBetrayal = (e) => {
            if (!isOpen) return
            const [ x, y ] = [ e.clientX, e.clientY ]
            const rect = popoverRef.current.getBoundingClientRect()
            const isMouseOut = x < rect.x - SELECTION_OFFSET || x > rect.right + SELECTION_OFFSET ||
                y < rect.top - SELECTION_OFFSET || y > rect.bottom + SELECTION_OFFSET
            // console.log(x, y, 'rect <->', rect.x - SELECTION_OFFSET, rect.right + SELECTION_OFFSET, 'rect |', rect.top - SELECTION_OFFSET, rect.bottom + SELECTION_OFFSET, 'condizione', isMouseOut)
            if (isMouseOut) setIsOpen(false)
        }

        window.addEventListener('resize', onScreenChange)
        window.addEventListener('click', onBetrayal)

        return () => {
            document.removeEventListener('resize', onScreenChange)
            document.removeEventListener('click', onBetrayal)
        }
    })

    useEffect(() => {
        onScreenChange()
    }, [])

    return (
        <div style={{
                opacity: isOpen ? 1 : 0,
                pointerEvents: isOpen ? 'all' : 'none',
                left: left ? offset.x : 'auto',
                right: left ? 'auto' : offset.x,
                borderTopLeftRadius: left ? 0 : '.375rem',
                borderTopRightRadius: left ? '.375rem' : 0,
                top: offset?.y ?? 0,
            }} ref={ popoverRef } className={`w-fit bg-slate-100 transition-all absolute cursor-default p-2 pt-0 shadow-lg rounded-md min-w-[180px] max-w-[200px] overflow-hidden select-none flex flex-col justify-center items-center ${ isOpen ? 'popover-open' : '' }`}>
            <div className="w-full px-3 py-2 h-full flex justify-between items-center space-x-2">
                <p className="text-lg text-slate-500 font-bold">{ name }</p>
                <img src="/icons/Apps/info.svg" className=" w-5" />
            </div>
            <div className="w-full rounded-md px-2 py-2 bg-white">
                {
                    options.map((option, idx) =>
                        !option.hide && option.type === 0 ?
                            <div key={ `pop-opt-${ idx }` } className="w-full p-1 px-2">
                                <p className="font-extrabold text-slate-700 uppercase text-xs tracking-wide">{ option.title }</p>
                                {
                                    option.isSubHtml ? 
                                        option.subtitle :
                                        option.isDate ?
                                        <span className="text-slate-500 text-sm font-medium break-all">{ option.subtitle }</span> :
                                        <span className="text-slate-500 font-medium break-all lowercase">{ option.subtitle.length > 30 ? option.subtitle.slice(0, 35) + '...' : option.subtitle }</span>
                                }
                            </div> : !option.hide ?
                            <div key={ `pop-opt-${ idx }` } onClick={ () => option.action(options) } className="w-full mt-2 transition-colors group rounded-md p-1 px-2 cursor-pointer hover:bg-slate-200/70 flex space-x-3 justify-start items-center">
                                <img src={`/icons/Apps/${ option.icon }.svg`} className="w-4" />
                                <p className="font-medium text-slate-500 group-hover:text-slate-600">{ option.name }</p>
                            </div> : ''
                    )
                }
            </div>
        </div>
    )
}