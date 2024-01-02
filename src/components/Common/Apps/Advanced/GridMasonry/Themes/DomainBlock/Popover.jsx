export default function Popover({ options=[] }) {
    return (
        <div className="w-fit shadow-lg rounded-md min-w-[100px] max-w-[150px] overflow-hidden flex flex-col justify-center items-center">
            <div className="w-full px-3 py-2 h-full flex justify-between items-center space-x-2 bg-slate-100">
                <p className="text-lg text-slate-500 font-bold">.com</p>
                <img src="/icons/Apps/info.svg" className=" w-5" />
            </div>
            <div className="w-full px-2 py-2">
                {
                    options.map(({ name, icon, action }) =>
                        <div className="w-full transition-colors group rounded-md p-1 cursor-pointer hover:bg-slate-200/70 flex space-x-3 justify-start items-center">
                            <img src={`/icons/Apps/${ icon }.svg`} className="w-4" />
                            <p className="font-medium text-slate-500 group-hover:text-slate-600">{ name }</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}