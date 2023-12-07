// React
import { useContext, useEffect } from "react"

// Components
import Navbar from "@/components/Common/Apps/Navbar"

// Context
import { AppContext } from "@/lib/AppContext"

export default function Domain() {

    const { user } = useContext(AppContext)

    useEffect(() => {
        document.body.classList.add('bg-slate-300')
    }, [])

    return (
        <div className="w-screen min-h-screen">
            <Navbar user={ user } />
        </div>
    )
}