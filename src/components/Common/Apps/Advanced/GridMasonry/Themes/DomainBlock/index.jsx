// React
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

// Components
import Placeholder from "@/components/Common/SkeletonLoader/Placeholder"
import Popover from "./Popover"

const INTERVAL_WAIT = 100

export default function DomainBlock({ loaded, addLoaded, element, idx }) {

    const [ isLoading, setIsLoading ] = useState(true)
    const [ isPopoverOpen, setIsPopoverOpen ] = useState(false)
    const imgRef = useRef()
    const placeHolderRef = useRef()
    const wrapperRef = useRef()

    useEffect(() => {
        setTimeout(() => {
            wrapperRef.current.style.opacity = 1
        }, 5e2 + (INTERVAL_WAIT * idx))
    }, [ loaded ])

    useEffect(() => {
        console.log(element)
        placeHolderRef.current.onload = () => placeHolderRef.current.style.opacity = 1
        imgRef.current.onload = () => {
            setIsLoading(false)
            addLoaded()
            imgRef.current.style.opacity = 1
        }

        placeHolderRef.current.src = element.img.small
        imgRef.current.src = element.img.regular
    }, [])

    useEffect(() => {console.log(`popover-${ idx }`, isPopoverOpen)}, [isPopoverOpen])
    
    return (
        <div ref={ wrapperRef } style={{ opacity: 0 }} className="transition-opacity shadow-md duration-1000 w-full h-full rounded-md relative bg-slate-200">
            <div className="w-full h-full absolute rounded-md bottom-0 left-0 bg-gradient-to-tr from-[#000000] z-30"></div>
            <img ref={ placeHolderRef } style={{ opacity: 0 }} loading="lazy" className="duration-1000 rounded-md transition-opacity absolute bottom-0 left-0 w-full h-full object-cover z-10 blur-md" />
            <img ref={ imgRef } style={{ opacity: 0 }} loading="lazy" className="transition-opacity rounded-md duration-1000 absolute bottom-0 left-0 w-full h-full object-cover z-20" />
            <div className="text-white relative z-40 w-full h-full flex flex-col justify-end">
                <div className="m-5 space-y-3">
                    <Placeholder loaded={ loaded }>
                        <p className="w-fit text-4xl font-medium leading-8">{ `${ element.query }.${ element.data?.tld }` }</p>
                    </Placeholder>
                    <div className="flex items-center space-x-3">
                        <Placeholder loaded={ loaded }>
                            <img src={ element.data?.available ? '/icons/Apps/thumb-up.svg' : '/icons/Apps/thumb-down.svg' } />
                        </Placeholder>
                        <Placeholder loaded={ loaded }>
                            <p style={{ color: element.data?.available ? 'rgb(74 222 128)' : 'rgb(248 113 113)'  }} className={`w-fit text-xl text-slate-100 leading-6`}>
                                {
                                    element.data?.available ?
                                        'Available' : 'Not Available'
                                }
                            </p>
                        </Placeholder>
                    </div>
                </div>
            </div>
            <div onClick={ () => setIsPopoverOpen(true) } className="absolute w-[30px] h-[30px] bg-white top-0 right-0 z-50 m-3 rounded-full flex justify-center items-center cursor-pointer">
                <img src="/icons/Apps/more.svg" className="select-none" />
                <Popover
                    key={ `pop-${idx}` }
                    name={ '.' + element.data?.tld }
                    isOpen={ isPopoverOpen }
                    setIsOpen={ setIsPopoverOpen }
                    offset={{ x: 10, y: 10 }}
                    left={ true }
                    options={[
                        {
                            title: 'Domain Name',
                            subtitle: 'tesTafss.com',
                            type: 0
                        },
                        {
                            title: 'Available',
                            subtitle: <img src="/icons/Apps/thumb-up.svg" className="w-5 mt-1" />,
                            isSubHtml: true,
                            type: 0
                        },
                        {
                            title: 'Registrar',
                            subtitle: 'Testosterone Inc.',
                            hide: true,
                            type: 0
                        },
                        {
                            title: 'Updated Date',
                            subtitle: '01-01-2024',
                            isDate: true,
                            hide: true,
                            type: 0
                        },
                        {
                            title: 'Creation Date',
                            subtitle: '01-01-2024',
                            isDate: true,
                            type: 0
                        },
                        {
                            title: 'Expiration Date',
                            subtitle: '01-01-2024',
                            isDate: true,
                            hide: true,
                            type: 0
                        },
                        {
                            title: 'Status',
                            subtitle: 'Ok!',
                            hide: true,
                            type: 0
                        },
                        {
                            name: 'Expand',
                            icon: 'expand',
                            type: 1,
                            action: () => undefined
                        }
                    ]}
                />
            </div>
        </div>
    )
}