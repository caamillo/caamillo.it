// React
import { useEffect, useRef, useState } from "react"

const BLOCK_SIZE = 300 // 300 px
const GAP_SIZE = 10 // 10 px

const X_RULES = [
    {
        id: 0, // Square
        size: {
            x: 1,
            y: 1
        }
    },
    {
        id: 1, // Long
        size: {
            x: 2,
            y: 1
        }
    },
    {
        id: 2, // Tall
        size: {
            x: 1,
            y: 2
        }
    },
]

const initializedRow = (chunkSize) => {
    return {
        values: [ ...Array(chunkSize) ].map(() => undefined),
        availability: [ ...Array(chunkSize) ].map(() => true)
    }
}

const generateShapesRoast = (spaceAvailable) =>
    X_RULES.filter(({ size }) => size.x <= spaceAvailable)

const generateChunkSize = (wrapperWidth) =>
    Math.floor(wrapperWidth / (BLOCK_SIZE + GAP_SIZE))

const getMasonry = (chunkSize, data) => {
    let curr = 0
    let rows = [
        initializedRow(chunkSize)
    ]

    let dataPool = [ ...[ ...data ].map((el, idx) => {
        return {
            id: idx,
            value: el
        }
    }) ]

    while (dataPool.length) {
        const element = dataPool[0] // Always select first element in datapool

        // General Context
        if (curr >= rows.length) rows.push(initializedRow(chunkSize))
        const row = rows[curr]
        // console.log('row status:', row)
        // console.log('spaceAvailable:', row.availability)

        // Shape Placement Context
        const idx = row.availability.findIndex(el => el) // Find first place available in row
        if (idx < 0) { // If not found, search for next row and go for next loop tick
            // console.log('NEXT ROW!')
            curr += 1
            continue
        }
        // console.log('idx', idx)
        const collisionIdx = row.availability.findIndex((el, elIdx) => elIdx > idx && !el)
        // console.log('collisionIdx', collisionIdx)

        const shapesRoast = generateShapesRoast(collisionIdx >= 0 ? collisionIdx - idx : row.availability.length - idx)
        // console.log('spaces Roast', shapesRoast)

        const rndShape = shapesRoast[Math.floor(Math.random() * shapesRoast.length)]
        // console.log('rndShape', rndShape)

        // Place Shapes
        for (let y = 0; y < rndShape.size.y; y++) { // Drawing shapes y - x
            // console.log('DRAWING ROW', curr + y)
            for (let x = 0; x < rndShape.size.x; x++) {
                // console.log('DRAWING COL', idx + x)
                if (curr + y >= rows.length) rows.push(initializedRow(chunkSize))
                rows[curr + y].availability[idx + x] = false
                rows[curr + y].values[idx + x] = {
                    shapeId: rndShape.id,
                    element: element
                }
            }
        }
        
        dataPool = dataPool.filter((el, elIdx) => elIdx) // Remove first element after draw
    }
    // console.log('ROWS final', rows)
    return rows
}

const generateGridTemplateAreaStyle = (masonry) => {
    console.log('MASONRY', masonry)

}

export default function GridMasonry({ data }) {

    const wrapperRef = useRef()
    const [ wrapperWidth, setWrapperWidth ] = useState()
    const [ chunkSize, setChunkSize ] = useState() // How many chunks in a row
    const [ masonry, setMasonry ] = useState()

    useEffect(() => {
        if (!masonry) return
        generateGridTemplateAreaStyle(masonry)
        // console.log('NEW MASONRY')
    }, [ masonry ])

    useEffect(() => {
        if (!chunkSize) return
        // console.log('chunkSize', chunkSize)
        setMasonry(getMasonry(chunkSize, data))
    }, [ chunkSize ])

    useEffect(() => {
        if (!wrapperWidth) return
        // console.log('wrapperWidth', wrapperWidth)
        let calcChunkSize = generateChunkSize(wrapperWidth)
        if (chunkSize != calcChunkSize) setChunkSize(calcChunkSize)
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
            {
                !!masonry &&
                masonry.map(row => {
                    
                })
            }
        </div>
    )
}