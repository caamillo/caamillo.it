// React
import { useEffect, useRef, useState } from "react"

// Components
import Block from "./Block"

const BLOCK_SIZE = 300 // 300 px
const GAP_SIZE = 10 // 10 px

const SHAPES_RULES = [
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
    SHAPES_RULES.filter(({ size }) => size.x <= spaceAvailable)

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
                    element: element,
                    start: {
                        x: idx,
                        y: curr
                    }
                }
            }
        }
        
        dataPool = dataPool.filter((el, elIdx) => elIdx) // Remove first element after draw
    }
    // console.log('ROWS final', rows)
    return rows
}

const generateGridTemplateAreaStyle = (masonry) => {
    let tempMasonry = [ ...masonry ]
    const areaTemplate = [ ...tempMasonry.map(row => row.values.map(() => '.')) ]
    const shapesToPlace = []
    for (let curr = 0; curr < masonry.length; curr++) {
        for (let idx = 0; idx < tempMasonry[curr].values.length; idx++) {
            const element = tempMasonry[curr].values[idx]
            if (!element) continue
            // console.log(element)
            // console.log(element.start, element.shapeId)
            shapesToPlace.push({
                name: `BLOCK-${ element.element.id }`,
                size: SHAPES_RULES[element.shapeId].size,
                element: element.element
            })
            for (let y = 0; y < SHAPES_RULES[element.shapeId].size.y; y++) {
                for (let x = 0; x < SHAPES_RULES[element.shapeId].size.x; x++) {
                    areaTemplate[element.start.y + y][element.start.x + x] = `BLOCK-${ element.element.id }`
                    tempMasonry[element.start.y + y].values[element.start.x + x] = undefined // Delete Chunks
                }
            }
        }
    }
    return [
        areaTemplate.map(row => row.join(' ')).map(row => `"${ row }"`).join('\n'),
        shapesToPlace
    ]
}

export default function GridMasonry({ data }) {

    const wrapperRef = useRef()
    const [ wrapperWidth, setWrapperWidth ] = useState()
    const [ chunkSize, setChunkSize ] = useState() // How many chunks in a row
    const [ masonry, setMasonry ] = useState()
    const [ gridTemplateArea, setGridTemplateArea ] = useState()
    const [ shapesToPlace, setShapesToPlace ] = useState()

    useEffect(() => {
        if (!shapesToPlace) return
        console.log(shapesToPlace)
    }, [shapesToPlace])

    useEffect(() => {
        if (!masonry) return
        console.log('masonry', masonry)
        const [ areaTemplate, orderPlace ] = generateGridTemplateAreaStyle(masonry)
        setGridTemplateArea(areaTemplate)
        setShapesToPlace(orderPlace)
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
            <div className="grid" style={{ gridTemplateAreas: gridTemplateArea, gap: `${ GAP_SIZE }px` }}>
                {
                    shapesToPlace?.map(({ name, size, element }, idx) =>
                        <Block
                            name={ name }
                            size={ size }
                            element={ element }
                            blockSize={ BLOCK_SIZE }
                            idx={ idx }
                            key={ name }
                        />
                    )
                }
            </div>
        </div>
    )
}