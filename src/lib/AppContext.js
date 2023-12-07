// React
import { createContext, useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"

// lib
import { GenericContext } from "./GenericContext"

// Utils
import { isValid, parse } from '@/utils/token'

// Components
import AppLayout from "@/components/Common/Apps/AppLayout"
import ForceLogin from "@/components/Common/Apps/ForceLogin"

const AppContext = createContext()

const AppContextProvider = ({ children }) => {

    const router = useRouter()
    const { token, setToken, isTokenValid, setIsTokenValid } = useContext(GenericContext)
    const [ user, setUser ] = useState()
    const [ isTokenValidated, setIsTokenValidated ] = useState(false)
    const [ currServiceIdx, setCurrServiceIdx ] = useState(-1)

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

    useEffect(() => {
        switch (router.pathname.slice(6)) {
            case 'domain':
                return setCurrServiceIdx(0)
            default:
                setCurrServiceIdx(-1)
        }
    }, [])

    return (
        <>
            {
                !!user && isTokenValidated ?
                    <AppContext.Provider value={{ user, token, setToken, currServiceIdx, setCurrServiceIdx }}>
                        <AppLayout>
                            { children }
                        </AppLayout>
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