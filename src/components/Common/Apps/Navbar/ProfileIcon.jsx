export default function ProfileIcon({ name, className }) {
    return (
        <div className={`w-[60px] h-[60px] bg-slate-700 uppercase text-center flex justify-center items-center rounded-full ${ className }`}>
            <span className="font-bold text-white text-lg tracking-[2px]">{ name?.slice(0, 2) }</span>
        </div>
    )
}