// React
import { useState, useEffect } from 'react'

// Lib
import Stack from './Stack'

export default function ErrorManager({ maxStack=3 }) {

    const [ errors, setErrors ] = useState([ { title: 1 } ])
    const [ counter, setCounter ] = useState(1)

    return (
        <div className="w-screen h-screen fixed pointer-events-none">
            <button onClick={
                () => setErrors(errors => {
                    setCounter(counter + 1)
                    return [ ...errors, { title: counter + 1 } ]
                })
            } className='bg-red-400 pointer-events-auto rounded-sm px-5 py-2 text-red-200 absolute bottom-5 left-5 cursor-pointer'>Add Error</button>
            <Stack maxStack={ maxStack } className='absolute bottom-5 right-5 w-[200px]' errors={ errors } />
        </div>
    )
}