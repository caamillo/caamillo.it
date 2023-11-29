// React
import { useState, useEffect } from 'react'

// Lib
import Stack from './Stack'

export default function ErrorManager({ maxStack=3, errors, setErrors }) {
    return (
        <div className="w-screen h-screen fixed pointer-events-none">
            <Stack maxStack={ maxStack } className='absolute bottom-5 right-5 w-[200px]' errors={ errors } setErrors={ setErrors } />
        </div>
    )
}