export default function Badge({ children }) {
    return (
        <div className="px-3 py-1 rounded-full bg-slate-600 text-slate-300 text-sm">
            { children }
        </div>
    )
}