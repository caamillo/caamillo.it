// React
import Link from "next/link"

// Components
import ProfileIcon from "./ProfileIcon"

const services = [
    {
        name: 'Domain Finder',
        link: '/domain'
    },
    {
        name: 'Other App',
        link: '/test'
    }
]

export default function Navbar({ user, currServiceIdx, setCurrServiceIdx }) {

    return (
        <div className="m-5 flex justify-center">
            <div className="xl:w-full container bg-slate-100 shadow-md rounded-md p-5 flex justify-between">
                <div className="flex flex-col justify-center">
                    <p className="font-bold text-slate-800">Apps:</p>
                    <div className="flex space-x-3">
                        {
                            services.map(({ name, link }, idx) =>
                                    <Link onClick={ () => setCurrServiceIdx(idx) } key={`serv-${ name }-${ idx }`} href={ `/apps${ link }` }
                                    className={`${ idx === currServiceIdx ? 'text-slate-400' : 'text-slate-600 hover:text-slate-500' } transition-colors`}>{ name }</Link>
                                )
                        }
                    </div>
                </div>
                <div className="flex items-center space-x-5">
                    <div className="space-y-2">
                        <p className="font-bold text-slate-900 leading-3">Tokens:</p>
                        <p className="text-slate-700 leading-4">0/5</p>
                    </div>
                    <div className="grid grid-cols-2 w-[150px] justify-items-end items-center">
                        <div className="space-y-1 text-slate-700">
                            <p className="leading-3">Hello,</p>
                            <p className="font-bold break-all leading-4 text-slate-900">{ user?.name }</p>
                        </div>
                        <ProfileIcon name={ user?.name } />
                    </div>
                </div>
            </div>
        </div>
    )
}