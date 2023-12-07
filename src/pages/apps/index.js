// React
import { useEffect, useContext, useState } from "react"
import Link from "next/link"

// Lib
import { parse, isValid } from "@/utils/token"

// Context
import { GenericContext } from "@/lib/GenericContext"

export default function Hub () {

    const { token } = useContext(GenericContext)
    const [ parsedToken, setParsedToken ] = useState()

    useEffect(() => {
        document.body.style.background = 'white'
    }, [])

    useEffect(() => {
        if (!token) return
        (async () => {
            if (await isValid(token)) setParsedToken(parse(token))
        })()
    }, [ token ])

    return (
        <div className="w-screen min-h-screen flex flex-col items-center">
            <p className="text-3xl">Hello, <span>{ parsedToken?.name ?? 'foreigner' }</span></p>
            <div>
                { !!parsedToken ?
                    <>
                        <p className="text-xl mt-5">List of apps:</p>
                        <div className="mt-3">
                            <Link href="apps/domain">Domain finder</Link>
                        </div>
                    </>
                    :
                    <>
                        <p>In order to get access to apps, please <Link href="/login">Login</Link> first.</p>
                    </>
                }
            </div>
        </div>
    )
}