// Components
import ProfileIcon from "./ProfileIcon"

export default function Navbar({ user }) {
    return (
        <div className="m-5">
            <div className="w-full bg-slate-100 rounded-md p-5 flex justify-between">
                <div>
                    Apps:
                    Ciao
                </div>
                <ProfileIcon name={ user?.name } />
            </div>
        </div>
    )
}