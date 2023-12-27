// React
import { useEffect, useRef, useState } from "react"

// Components
import Block from "./Block"

const BLOCK_SIZE = 300 // 300 px
const GAP_SIZE = 10 // 10 px

const SHAPES_RULES = [
    {
        id: 0, // Square
        min: 0,
        size: {
            x: 1,
            y: 1
        }
    },
    {
        id: 1, // Long,
        min: 2,
        size: {
            x: 2,
            y: 1
        }
    },
    {
        id: 2, // Tall
        min: 2,
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

const generateShapesRoast = (chunkSize, spaceAvailable) =>
    SHAPES_RULES.filter(({ min, size }) => size.x <= spaceAvailable && chunkSize >= min)

const generateChunkSize = (wrapperWidth) =>
    Math.floor(wrapperWidth / (BLOCK_SIZE + GAP_SIZE))

const generateGridTemplateAreaStyle = (masonry) => {
    let tempMasonry = JSON.parse(JSON.stringify(masonry))
    const areaTemplate = [ ...tempMasonry.map(row => row.values.map(() => '.')) ]
    const shapesToPlace = []
    for (let curr = 0; curr < masonry.length; curr++) {
        for (let idx = 0; idx < tempMasonry[curr].values.length; idx++) {
            const element = tempMasonry[curr].values[idx]
            if (!element) continue
            shapesToPlace.push({
                name: `BLOCK-${ element.id }`,
                size: SHAPES_RULES[element.shapeId].size,
                element: element.element
            })
            for (let y = 0; y < SHAPES_RULES[element.shapeId].size.y; y++) {
                for (let x = 0; x < SHAPES_RULES[element.shapeId].size.x; x++) {
                    areaTemplate[element.start.y + y][element.start.x + x] = `BLOCK-${ element.id }`
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

const addToMasonry = (data, chunkSize, rows=[]) => {
    let curr = rows.findIndex(row => row.availability.some(el => el))
    if (curr === -1) {
        rows.push(initializedRow(chunkSize))
        curr = rows.length - 1
    }
    const allIds = rows.map(row => row.values).map(value => value.map(el => el?.id)).flat().filter(id => typeof id === 'number')
    let pushed
    if (allIds.length) pushed = Math.max(...allIds) + 1
    else pushed = 0
    let dataPool = [ ...[ ...data.data ].map((el, idx) => {
        return {
            id: idx,
            value: el,
            query: data.query
        }
    }) ]

    while (dataPool.length) {
        const element = dataPool[0] // Always select first element in datapool

        // General Context
        if (curr >= rows.length) rows.push(initializedRow(chunkSize))
        const row = rows[curr]

        // Shape Placement Context
        const idx = row.availability.findIndex(el => el) // Find first place available in row
        if (idx < 0) { // If not found, search for next row and go for next loop tick
            curr += 1
            continue
        }
        const collisionIdx = row.availability.findIndex((el, elIdx) => elIdx > idx && !el)

        const shapesRoast = generateShapesRoast(chunkSize, collisionIdx >= 0 ? collisionIdx - idx : row.availability.length - idx)

        const rndShape = shapesRoast[Math.floor(Math.random() * shapesRoast.length)]

        // Place Shapes
        for (let y = 0; y < rndShape.size.y; y++) { // Drawing shapes y - x
            for (let x = 0; x < rndShape.size.x; x++) {
                if (curr + y >= rows.length) rows.push(initializedRow(chunkSize))
                rows[curr + y].availability[idx + x] = false
                rows[curr + y].values[idx + x] = {
                    id: pushed,
                    shapeId: rndShape.id,
                    element: element,
                    start: {
                        x: idx,
                        y: curr
                    }
                }
            }
        }
        pushed += 1
        
        dataPool = dataPool.filter((el, elIdx) => elIdx) // Remove first element after draw
    }
    return rows
}
// [{ availability[], values[] } -> ROW ] -> ROWS
const fillMasonry = (data, rows=[], setWaitingData) => {
    let emptyBlocks = []
    const checkedIds = []
    for (let y in rows) {
        const row = rows[y]
        for (let x in row.values) {
            if (!checkedIds.includes(row.values[x]?.id) && !row.availability[x] && row.values[x]?.id >= 0 && row.values[x]?.element.value === undefined) // check if block is owned and if it's empty
                emptyBlocks.push({
                    x: parseInt(x),
                    y: parseInt(y)
                })
            if(row.values[x]?.id >= 0 && !checkedIds.includes(row.values[x]?.id)) checkedIds.push(row.values[x].id)
        }
        if (emptyBlocks.length >= data.data.length) break // May be greater or lower than data pooling length
    }
    // Check if we need more empty-blocks
    if (emptyBlocks.length < data.data.length) {
        // Then, we take last -diff datas
        const diff = data.data.length - emptyBlocks.length
        // TODO: check if before that pool also exists another add event so to make less adding
        setWaitingData(waitingData => [
            ...waitingData,
            {
                query: data.query,
                type: 'add',
                data: data.data.slice(-diff).map(() => undefined)
            },
            {
                query: data.query,
                type: 'fill',
                data: data.data.slice(-diff)
            }
        ])
    } else {
        for (let idx in data.data) {
            const element = data.data[idx]
            const emptyBlock = emptyBlocks[idx]
            const block = rows[emptyBlock.y].values[emptyBlock.x]
            const shape = SHAPES_RULES[block.shapeId]

            for (let y = 0; y < shape.size.y; y++) {
                for (let x = 0; x < shape.size.x; x++) {
                    rows[block.start.y + y].values[block.start.x + x].element.value = element
                }
            }
        }
    }

    return rows
}

export default function GridMasonry({ data, theme, loaded, addLoaded, className }) {

    const wrapperRef = useRef()
    const [ wrapperWidth, setWrapperWidth ] = useState()
    const [ chunkSize, setChunkSize ] = useState() // How many chunks in a row
    const [ gridTemplateArea, setGridTemplateArea ] = useState()
    const [ shapesToPlace, setShapesToPlace ] = useState()
    const [ diffData, setDiffData ] = useState()
    const [ lastMasonry, setLastMasonry ] = useState([])
    const [ savedData, setSavedData ] = useState([])
    const [ available, setAvailable ] = useState(true)
    const [ waitingData, setWaitingData ] = useState([])

    const resolveData = (resolvingData) => {
        if (resolvingData.type === 'add') {
            const oldTlds = savedData.map(el => el?.data.tld) // Next, check oldTLDs
            setDiffData({
                data: resolvingData.data,
                query: resolvingData.query,
                type: 'add'
            })
        } else if (resolvingData.type === 'fill') {
            setDiffData({
                ...resolvingData
            })
        } else console.log(`Error, ${ resolvingData.type } is not a type`)
    }

    useEffect(() => {
        if (!shapesToPlace) return
    }, [ shapesToPlace ])

    useEffect(() => {
        if (!available || !waitingData.length) return
        setWaitingData(waitingData => {
            setAvailable(false)
            const firstElem = waitingData[0]
            resolveData(firstElem)
            return waitingData.slice(1)
        })
    }, [ available, waitingData ])

    useEffect(() => {
        if (!data) return
        setWaitingData(waitingData => [ ...waitingData, data ])
    }, [ data ])

    useEffect(() => {
        if (!diffData) return
        setSavedData(savedData => [ ...savedData, ...diffData.data ])
        let masonry
        switch (diffData.type) {
            case 'add':
                masonry = addToMasonry(diffData, chunkSize, lastMasonry)
                break
            case 'fill':
                masonry = fillMasonry(diffData, lastMasonry, setWaitingData)
                break
        }
        setLastMasonry(masonry)
        const [ areaTemplate, orderPlace ] = generateGridTemplateAreaStyle(masonry)
        setGridTemplateArea(areaTemplate)
        setShapesToPlace(orderPlace)
        setAvailable(true)
    }, [ chunkSize, diffData ])

    useEffect(() => {
        if (!wrapperWidth) return
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
        <div className={`w-full flex justify-center select-none ${ className }`}>
            <div ref={ wrapperRef } className="grid container" style={{ gridTemplateAreas: gridTemplateArea, gap: `${ GAP_SIZE }px` }}>
                {
                    shapesToPlace?.map(({ name, size, element }, idx) =>
                        <Block
                            name={ name }
                            size={ size }
                            element={ element }
                            blockSize={ BLOCK_SIZE }
                            idx={ idx }
                            Theme={ theme }
                            loaded={ loaded }
                            addLoaded={ addLoaded }
                            key={ name }
                        />
                    )
                }
            </div>
        </div>
    )
}