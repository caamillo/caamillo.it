import { useState, useEffect } from "react"

const INTERVAL_WAIT = 100

export default function Block({ name, size, element, blockSize, idx }) {

    const [ isReady, setIsReady ] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsReady(true)
        }, 5e2 + (100 * idx))
    }, [])

    return (
        <>
            {
            isReady &&
            <div
                className="bg-slate-200 fade-in-block flex justify-center items-center rounded-md"
                style={{ gridArea: name, minHeight: `${ blockSize * size.y }px` }}
            >
                { element.value.name }
            </div>
            }
        </>
    )
}