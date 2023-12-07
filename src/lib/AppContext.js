// React
import { createContext, useState, useEffect, useContext } from "react"
import Link from "next/link"

// lib
import { GenericContext } from "./GenericContext"

// Utils
import { isValid, parse } from '@/utils/token'

// Components
import ForceLogin from "@/components/Common/Apps/ForceLogin"

const AppContext = createContext()

const AppContextProvider = ({ children }) => {

    const { token, setToken, isTokenValid, setIsTokenValid } = useContext(GenericContext)
    const [ user, setUser ] = useState()
    const [ isTokenValidated, setIsTokenValidated ] = useState(false)

    useEffect(() => {
        ;(async () => {
            // console.log('tick')
            const isValidRes = await isValid(token)

            if (isValidRes) setUser(parse(token))
            else {
                setIsTokenValid(false)
                setUser(undefined) // cuz we have to reset it
            }

            setIsTokenValidated(true)
        })()
    }, [ token ])

    return (
        <>
            {
                !!user && isTokenValidated ?
                    <AppContext.Provider value={{ user, token, setToken }}>
                        { children }
                    </AppContext.Provider>
                : isTokenValidated ?
                    <ForceLogin/>
                : <></>
            }
        </>
    )
}

export {
    AppContext,
    AppContextProvider
}