// React
import { createContext, useState, useEffect } from "react"

// Components
import ErrorManager from '@/components/Error'

// Deps
import { useLocalStorage } from "usehooks-ts"

// Utils
import { checkExpire } from '@/utils/token'

const GenericContext = createContext()

const GenericContextProvider = ({ children }) => {

    const [ token, setToken ] = useLocalStorage('token', '')
    const [ isTokenValid, setIsTokenValid ] = useState(true)
    const [ errors, setErrors ] = useState([])

    useEffect(() => {
        if (!token) return
        (async () => {
            setIsTokenValid(!!(await checkExpire(token)))
        })()
      }, [ token ])

    return (
        <GenericContext.Provider value={{ errors, setErrors, token, setToken, isTokenValid, setIsTokenValid }}>
            { children }
            <ErrorManager errors={ errors } setErrors={ setErrors } />
        </GenericContext.Provider>
    )
}
export {
    GenericContextProvider,
    GenericContext
}
