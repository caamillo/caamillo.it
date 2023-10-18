export default function Badge({ children }) {
    return (
        <div className="px-3 py-1 rounded-full bg-slate-600 text-slate-300 text-sm whitespace-nowrap cursor-default select-none transition-colors hover:bg-slate-500 hover:text-slate-200">
            { children }
        </div>
    )
}