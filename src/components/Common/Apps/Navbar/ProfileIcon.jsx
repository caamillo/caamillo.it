export default function ProfileIcon({ name, className }) {
    return (
        <div className={`w-[60px] h-[60px] select-none bg-slate-700 uppercase text-center flex aspect-square justify-center items-center rounded-full ${ className }`}>
            <span className="font-bold cursor-default text-white text-lg tracking-[2px]">{ name?.slice(0, 2) }</span>
        </div>
    )
}