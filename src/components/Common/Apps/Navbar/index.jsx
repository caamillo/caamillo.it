// Components
import ProfileIcon from "./ProfileIcon"

export default function Navbar({ user }) {
    return (
        <div className="m-5">
            <div className="w-full bg-slate-100 shadow-md rounded-md p-5 flex justify-between">
                <div>
                    <p className="font-bold">Apps:</p>
                    <div className="flex space-x-3">
                        <span>Domain Finder</span>
                        <span>Other App</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 w-[150px] justify-items-end items-center">
                    <div className="space-y-1">
                        <p className="leading-3">Hello,</p>
                        <p className="font-bold break-all leading-4">{ user?.name }</p>
                    </div>
                    <ProfileIcon name={ user?.name } />
                </div>
            </div>
        </div>
    )
}