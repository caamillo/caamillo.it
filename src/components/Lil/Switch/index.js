// React
import { useState } from "react"

export default function Switch({ options, callback, className }) {

    const [ optionSelected, setOptionSelected ] = useState(0)

    const onOptionChange = (idx) => {
        setOptionSelected(idx)
        callback(idx)
    }

    return (
        <div className={`p-1 w-fit bg-slate-300 flex gap-1 rounded-md relative ` + className}>
            {
                options.map((option, idx) =>
                    <div
                        key={`switchopt-${ idx }`}
                        className={`p-2 uppercase rounded-md select-none cursor-pointer transition-colors duration-300 ease-in-out z-20 ${ idx === optionSelected ? 'text-slate-500' : 'text-slate-100' }`}
                        onClick={ () => onOptionChange(idx) }
                    >
                        { option }
                    </div>
                )
            }
            <div style={{ transform: optionSelected ? 'translateX(100%)' : 'translateX(0)' }} className="absolute w-1/2 h-full top-0 left-0 p-1 transition-transform ease-in-out duration-300">
                <div className="bg-slate-200 w-full h-full rounded-md z-10"></div>
            </div>
        </div>
    )
}