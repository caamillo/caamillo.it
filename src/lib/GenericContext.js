// React
import { createContext, useState } from "react"

// Components
import ErrorManager from '@/components/Error'

const GenericContext = createContext()

const GenericContextProvider = ({ children }) => {
    const [ errors, setErrors ] = useState([])

    return (
        <GenericContext.Provider value={{ errors, setErrors }}>
            { children }
            <ErrorManager errors={ errors } setErrors={ setErrors } />
        </GenericContext.Provider>
    )
}
export {
    GenericContextProvider,
    GenericContext
}
