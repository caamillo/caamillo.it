// React
import { useReducer, useEffect, useRef, useState, useContext } from "react"

// Components
import GridMasonry from "@/components/Common/Apps/Advanced/GridMasonry"
import DomainBlock from "@/components/Common/Apps/Advanced/GridMasonry/Themes/DomainBlock"

// Utils
import { avoidIllegalCharacters } from "@/utils/domain"

// Context
import { AppContext } from "@/lib/AppContext"

export default function Domain() {

    useEffect(() => {
        document.body.classList.add('bg-slate-300')
    }, [])

    const searchDomain = () => {
        if (!searchRef.current.value) return alert('asaasafs')
        // setSearch(undefined)
        fetch(`${ process.env.NEXT_PUBLIC_API_ENDPOINT }/v1/bulk-whois/${ searchRef.current.value }?page=${ page }&chunk=4`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })
            .then(res => res.json())
            .then(data => setSearch(search => {
                setPage(page => page + 1)
                let dataArr = []
                if (search?.data) dataArr.push(...search.data)
                return {
                    query: searchRef.current.value,
                    data: [
                        ...dataArr,
                        ...data
                    ]
                }
            }))
    }

    const searchRef = useRef()
    const [ search, setSearch ] = useState()
    const [ page, setPage ] = useState(0)
    const [ loaded, addLoaded ] = useReducer(({ count }) => {
        if (count < search.length - 1) return { done: false, count: count + 1 }
        return { done: true, count: count }
    }, { done: false, count: 0 })
    const { token } = useContext(AppContext)

    return (
        <div className="w-full flex justify-center">
            <div className="w-full flex flex-col items-center container">
                <div className="xl:w-1/2 w-full h-[70px] p-2 rounded-md bg-slate-100 relative shadow-md">
                    <input onKeyDown={ avoidIllegalCharacters } ref={ searchRef } placeholder="Search for a domain..." className="w-full h-full placeholder:text-slate-400 placeholder:font-normal text-slate-600 font-medium rounded-md outline-none px-3 pr-14 bg-slate-200 text-2xl" />
                    <img onClick={ searchDomain } src="/icons/Apps/search.svg" className="absolute top-1/2 -translate-y-1/2 right-5 w-[30px] cursor-pointer" />
                </div>
                <div className="w-full my-5">
                    <GridMasonry
                        data={ search }
                        loaded={ loaded }
                        addLoaded={ addLoaded }
                        theme={ DomainBlock }
                    />
                </div>
            </div>
        </div>
    )
}