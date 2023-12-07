// React
import { useContext } from "react"

// Components
import Navbar from "./Navbar"

// Context
import { AppContext } from "@/lib/AppContext"

export default function AppLayout({ children }) {
    const { user, currServiceIdx } = useContext(AppContext)

    return (
        <div className="w-screen min-h-[calc(100vh-20px)]">
            <Navbar user={ user } currServiceIdx={ currServiceIdx } />
            <div className="mx-5">
                { children }
            </div>
        </div>
    )
}