// React
import { useEffect, useContext } from "react"
import Link from "next/link"

// Lib
import { logout } from "@/utils/token"

// Context
import { AppContext } from "@/lib/AppContext"

export default function Hub () {

    const { user, token, setToken } = useContext(AppContext)

    useEffect(() => {
        document.body.style.background = 'white'
    }, [])

    return (
        <div className="flex flex-col items-center">
            <p className="text-3xl">Hello, <span>{ user?.name ?? 'foreigner' }</span></p>
            <div>
                <p className="text-xl mt-5">List of apps:</p>
                <div className="my-3">
                    <Link href="apps/domain">Domain finder</Link>
                </div>
                <button onClick={ () => logout(token, setToken) } className="cursor-pointer">Logout :(</button>
            </div>
        </div>
    )
}