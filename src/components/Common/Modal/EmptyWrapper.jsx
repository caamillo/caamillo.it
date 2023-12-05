export default function EmptyWrapper({ className, children }) {
    return (
        <div className={`w-full lg:w-2/3 xl:w-1/2 mx-3 flex flex-col items-center text-center ${ className }`}>
            { children }
        </div>
    )
}