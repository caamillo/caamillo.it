// React
import { useState, useRef, useEffect } from "react"

export default function Switch({ options, callback, className }) {

    const optionsWrapper = useRef()
    const mortodifiga = useRef()
    const [ optionSelected, setOptionSelected ] = useState(0)

    const GAP_SPACE = 4 // 4px, .25rem
    const PADDING_MORTODIFIGA = 8 // 8px, .5rem

    const updateMortodifiga = (idx) => {
        const children = [ ...optionsWrapper.current.children ]
        mortodifiga.current.style.width = `${ children[idx].offsetWidth + PADDING_MORTODIFIGA }px`
        const toTranslate = children.slice(0, idx).reduce((acc, curr) => acc + curr.offsetWidth + GAP_SPACE, 0)
        console.log(children.slice(0, idx))
        mortodifiga.current.style.transform = `translateX(${ toTranslate }px)`
    }

    const onOptionChange = (idx) => {
        setOptionSelected(idx)
        callback(idx)
    }

    useEffect(() => {
        updateMortodifiga(optionSelected)
    }, [ optionSelected ])

    return (
        <div className={`p-1 w-fit bg-slate-300 rounded-md relative ` + className}>
            <div ref={ optionsWrapper } className="flex gap-1">
                {
                    options.map((option, idx) =>
                        <div
                            key={`switchopt-${ idx }`}
                            className={`p-2 uppercase rounded-md select-none font-bold cursor-pointer transition-colors duration-300 ease-in-out z-20 ${ idx === optionSelected ? 'text-slate-500' : 'text-slate-100' }`}
                            onClick={ () => onOptionChange(idx) }
                        >
                            { option }
                        </div>
                    )
                }
            </div>
            <div ref={ mortodifiga } className="absolute h-full top-0 left-0 p-1 transition-all ease-in-out duration-300">
                <div className="bg-slate-200 w-full h-full rounded-md shadow-md z-10"></div>
            </div>
        </div>
    )
}