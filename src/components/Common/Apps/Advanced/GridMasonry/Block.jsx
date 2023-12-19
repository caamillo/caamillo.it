// React
import { useState, useEffect } from "react"

// Theme
import Default from "./Themes/Default"

export default function Block({ name, size, element, blockSize, idx, Theme, loaded, addLoaded }) {

    return (
        <div
            className="fade-in-block bg-slate-200 flex justify-center items-center rounded-md"
            style={{ gridArea: name, minWidth: `${ blockSize * size.x }px`, minHeight: `${ blockSize * size.y }px` }}
        >
            {
                !!Theme ?
                <Theme element={ { query: element.query, ...element.value } } loaded={ loaded } addLoaded={ addLoaded } idx={ idx } /> :
                <Default element={ element.value } />
            }
        </div>
    )
}