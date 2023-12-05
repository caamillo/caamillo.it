export default function Wrapper({ children }) {
    return (
        <div className='warning-modal transition-transform duration-1000 ease-in-out bg-white w-full lg:w-2/3 xl:w-1/2 p-5 rounded-lg md:mt-10 mx-3 border-2 border-slate-300 flex flex-col items-center text-center'>
            { children }
        </div>
    )
}