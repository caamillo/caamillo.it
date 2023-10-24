export default function Stack({ children }) {
    return (
        <div className="flex flex-col items-center relative stack">
            { children }
        </div>
    )
}