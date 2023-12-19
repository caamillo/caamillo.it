// React
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

// Components
import Placeholder from "@/components/Common/SkeletonLoader/Placeholder"

// Public
import tlds from 'public/apps/domain-finder/index.json'

const INTERVAL_WAIT = 100

export default function DomainBlock({ loaded, addLoaded, element, idx }) {

    const [ isLoading, setIsLoading ] = useState(true)
    const imgRef = useRef()
    const placeHolderRef = useRef()
    const wrapperRef = useRef()

    useEffect(() => {
        setTimeout(() => {
            wrapperRef.current.style.opacity = 1
        }, 5e2 + (INTERVAL_WAIT * idx))
    }, [ loaded ])

    useEffect(() => {
        placeHolderRef.current.onload = () => placeHolderRef.current.style.opacity = 1
        imgRef.current.onload = () => {
            setIsLoading(false)
            addLoaded()
            imgRef.current.style.opacity = 1
        }
        fetchImage()
    }, [])
    
    const fetchImage = async () => {
        const parsed = element.name.split('.').slice(-1).join('')
        const tld = tlds.data.tlds[parsed]
        const res = await fetch(`https://api.unsplash.com/search/photos/?client_id=${ process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY }&query=${ tld.query }&per_page=30`)
        const data = await res.json()

        const img = data.results[Math.floor(Math.random() * data.results.length)]
        
        placeHolderRef.current.src = img.urls.thumb
        imgRef.current.src = img.urls.raw
    }
    
    return (
        <div ref={ wrapperRef } style={{ opacity: 0 }} className="transition-opacity duration-1000 w-full h-full rounded-md relative overflow-hidden bg-slate-200">
            <div className="w-full h-full absolute bottom-0 left-0 bg-gradient-to-tr from-[#000000] z-30"></div>
            <img ref={ placeHolderRef } style={{ opacity: 0 }} loading="lazy" className="duration-1000 transition-opacity absolute bottom-0 left-0 w-full h-full object-cover z-10 blur-md" />
            <img ref={ imgRef } style={{ opacity: 0 }} loading="lazy" className="transition-opacity duration-1000 absolute bottom-0 left-0 w-full h-full object-cover z-20" />
            <div className="text-white relative z-40 w-full h-full flex flex-col justify-end">
                <div className="m-5 space-y-3">
                    <Placeholder loaded={ loaded } width="50%">
                        <p className="text-4xl font-medium leading-8">{ element.name }</p>
                    </Placeholder>
                    <Placeholder loaded={ loaded } width="30%">
                        <p className="text-xl text-slate-100 leading-5">
                            {
                                element.available ?
                                    'Available' : 'Not Available'
                            }
                        </p>
                    </Placeholder>
                </div>
            </div>
            <div className="absolute w-[30px] h-[30px] bg-white top-0 right-0 z-50 m-3 rounded-full flex justify-center items-center cursor-pointer">
                <img src="icons/Apps/more.svg" className="select-none" />
            </div>
        </div>
    )
}