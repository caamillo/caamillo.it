// React
import { useEffect, useRef, useState } from "react"

const BLOCK_SIZE = 300 // 300 px
const GAP_SIZE = 10 // 10 px

const X_RULES = [
    {
        id: 0, // Square
        size: 1
    },
    {
        id: 1, // Long
        size: 2
    },
    {
        id: 2, // Tall
        size: 1
    },
]

const chunkerizeRow = (row) => {
    const chunkerized = []
    for (let element of chunksAvailable) {
        if (element) {
            
        }
    }
}

const generateShapesRoast = (spaceAvailable) =>
    X_RULES.filter(({ size }) => size <= spaceAvailable)

const generateChunkSize = (wrapperWidth) =>
    Math.floor(wrapperWidth / (BLOCK_SIZE + GAP_SIZE))

const drawMasonry = (wrapperWidth, data) => {
    console.log('wrapperWidth', wrapperWidth)
    const chunkSize = generateChunkSize(wrapperWidth)
    console.log('chunkSize', chunkSize)
    
    const masonry = []
    let rows = [
        {
            values: [],
            availability: Array(chunkSize).fill(true)
        }
    ]

    for (let element of data) {

        console.log('row status:', tempRow)
        console.log('spaceAvailable:', spaceAvailable)

        const shapesRoast = generateShapesRoast(spaceAvailable)
        const rndShape = shapesRoast[Math.floor(Math.random() * shapesRoast.length)]
        console.log('rndShape', rndShape)
    }
}

export default function GridMasonry({ data }) {

    const wrapperRef = useRef()
    const [ wrapperWidth, setWrapperWidth ] = useState()

    useEffect(() => {
        if (!wrapperWidth) return
        drawMasonry(wrapperWidth, data)
    }, [ wrapperWidth ])

    useEffect(() => {
        setWrapperWidth(wrapperRef.current.offsetWidth)
    }, [])
    
    useEffect(() => {
        const onScreenChange = () => {
            setWrapperWidth(wrapperRef.current.offsetWidth)
        }

        window.addEventListener('resize', onScreenChange)
        return () => document.removeEventListener('resize', onScreenChange)
    })

    return (
        <div ref={ wrapperRef } className="masonry-wrapper w-full">
            grid
        </div>
    )
}