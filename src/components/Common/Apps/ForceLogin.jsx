// React
import Link from "next/link"

export default function ForceLogin() {
    return (
        <div className="w-screen min-h-screen bg-slate-300 flex justify-center items-center">
            <p className="text-slate-600 text-3xl">In order to get access to apps, please <Link className="cursor-pointer font-bold" href="/login">Login</Link> first.</p>
        </div>
    )
}