export default function Popover({ name="", options=[] }) {
    return (
        <div className="w-fit bg-slate-100 p-2 pt-0 shadow-lg rounded-md rounded-tl-none min-w-[180px] max-w-[200px] overflow-hidden select-none flex flex-col justify-center items-center">
            <div className="w-full px-3 py-2 h-full flex justify-between items-center space-x-2">
                <p className="text-lg text-slate-500 font-bold">{ name }</p>
                <img src="/icons/Apps/info.svg" className=" w-5" />
            </div>
            <div className="w-full rounded-md px-2 py-2 bg-white">
                {
                    options.map(option =>
                        !option.hide && option.type === 0 ?
                            <div className="w-full p-1 px-2">
                                <p className="font-extrabold text-slate-700 uppercase text-xs tracking-wide">{ option.title }</p>
                                {
                                    option.isSubHtml ? 
                                        option.subtitle :
                                        option.isDate ?
                                        <span className="text-slate-500 text-sm font-medium break-all">{ option.subtitle }</span> :
                                        <span className="text-slate-500 font-medium break-all">{ option.subtitle.length > 30 ? option.subtitle.slice(0, 35) + '...' : option.subtitle }</span>
                                }
                            </div> : !option.hide ?
                            <div onClick={ () => option.action(options) } className="w-full mt-2 transition-colors group rounded-md p-1 px-2 cursor-pointer hover:bg-slate-200/70 flex space-x-3 justify-start items-center">
                                <img src={`/icons/Apps/${ option.icon }.svg`} className="w-4" />
                                <p className="font-medium text-slate-500 group-hover:text-slate-600">{ option.name }</p>
                            </div> : ''
                    )
                }
            </div>
        </div>
    )
}