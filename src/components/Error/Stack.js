// React
import { useState, useEffect, useRef } from 'react'

// Lib
import Toast from './Toast'

let cachedStack = []

export default function Stack({ children, errors, maxStack=3, className }) {

    const stackRef = useRef()
    const [ stack, setStack ] = useState([ ...errors ])
    
    useEffect(() => {
        setStack(
            [ ...errors ].slice(-maxStack - 1).reverse().map((error, idx) => {
                return {
                    ...error,
                    idx: idx
                }
            })
        )
    }, [ errors ])

    const getOpacity = (idx, n, max) =>
        n - max > 0 ? idx >= n - max ? idx / max : 0 : (idx + 1) / n

    useEffect(() => {
        if (!stackRef.current || !stack.every(error => error.idx !== undefined)) return
        cachedStack = [ ...stack ].reverse().map((el, idx) => {
            let newElement = el
            if (cachedStack[idx]?.lastpos === undefined) newElement.lastpos = -1
            else newElement.lastpos = cachedStack[idx].lastpos
            return newElement
        })
        cachedStack.map((error, idx) => {
            const element = [ ...stackRef.current.children ].reverse()[ idx ]
            const lastpos = cachedStack[idx].lastpos
            if (lastpos >= 0) {
                const fromOpacity = getOpacity(idx + 1, cachedStack.length, maxStack)
                const toOpacity = getOpacity(idx, cachedStack.length, maxStack)
    
                element.animate([
                    { opacity: fromOpacity },
                    { opacity: toOpacity }
                ], { duration: 500, easing: 'ease-out' })
                element.style.opacity = toOpacity

                element.animate([
                    { transform: `translateY(-${ lastpos * 120 }%)` },
                    { transform: `translateY(-${ (lastpos + 1) * 120 }%)` }
                ], { duration: 500, easing: 'ease-out' })
                element.style.transform = `translateY(-${ (lastpos + 1) * 120 }%)`
                
            } else {
                element.animate([
                    { transform: 'translateX(150%)', opacity: 0 },
                    { transform: 'translateX(0%)', opacity: 1 }
                ], { duration: 500, easing: 'ease-out' })
            }
            if (cachedStack.length < maxStack + 1) cachedStack[idx].lastpos += 1
        })
    }, [ stack ])

    return (
        <div ref={ stackRef } className={ 'w-[300px] ' + className }>
            {
                stack.map(({ title }, idx) =>
                    <Toast
                        key={ 'err-' + idx }
                        title={ title }
                        desc={ 'Test Description' }
                        idx={ idx }
                    />
                )
            }
        </div>
    )
}