// React
import { createContext, useState, useEffect, useContext } from "react"
import Link from "next/link"

// lib
import { GenericContext } from "./GenericContext"

// Utils
import { isValid, parse } from '@/utils/token'

const AppContext = createContext()

const AppContextProvider = ({ children }) => {

    const { token, setToken, setIsTokenValid } = useContext(GenericContext)
    const [ user, setUser ] = useState()

    useEffect(() => {
        console.log('token tick', token)
        ;(async () => {
            const isValidRes = await isValid(token)

            if (isValidRes) setUser(parse(token))
            else setIsTokenValid(false)

            document.dispatchEvent(new CustomEvent('token-validated', { result: isValidRes }))
        })()
    }, [ token ])

    return (
        <>
            {
                !!user ?
                    <AppContext.Provider value={{ user, token, setToken }}>
                        { children }
                    </AppContext.Provider>
                :
                    <p>In order to get access to apps, please <Link href="/login">Login</Link> first.</p>
            }
        </>
    )
}

export {
    AppContext,
    AppContextProvider
}