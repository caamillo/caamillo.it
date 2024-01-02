// React
import { useReducer, useState, useEffect } from "react"

// Components
import GridMasonry from "@/components/Common/Apps/Advanced/GridMasonry"
import DomainBlock from "@/components/Common/Apps/Advanced/GridMasonry/Themes/DomainBlock"
import Popover from "@/components/Common/Apps/Advanced/GridMasonry/Themes/DomainBlock/Popover"

export default function Test() {

    const [ data, setData ] = useState()
    const [ loaded, addLoaded ] = useReducer(({ count }) => {
        if (count < data.length - 1) return { done: false, count: count + 1 }
        return { done: true, count: count }
    }, { done: false, count: 0 })

    const EXAMPLE_ADD_DATA = () => setData(data => {
        let dataArr = []
        if (data?.data) dataArr.push(...data.data)
        return {
            query: 'test',
            type: 'fill',
            data: [
                ...dataArr,
                {
                    data: {
                        tld: 'com' + Math.floor(Math.random() * 1000),
                        domainName: 'test.com',
                        available: true,
                    },
                    img: {
                        small: 'https://images.unsplash.com/photo-1682686581427-7c80ab60e3f3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        regular: 'https://images.unsplash.com/photo-1682686581427-7c80ab60e3f3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    }
                },
                {
                    data: {
                        tld: 'com' + Math.floor(Math.random() * 1000),
                        domainName: 'test.com',
                        available: true,
                    },
                    img: {
                        small: 'https://images.unsplash.com/photo-1682686581427-7c80ab60e3f3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        regular: 'https://images.unsplash.com/photo-1682686581427-7c80ab60e3f3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    }
                },
                {
                    data: {
                        tld: 'com' + Math.floor(Math.random() * 1000),
                        domainName: 'test.com',
                        available: true,
                    },
                    img: {
                        small: 'https://images.unsplash.com/photo-1682686581427-7c80ab60e3f3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        regular: 'https://images.unsplash.com/photo-1682686581427-7c80ab60e3f3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    }
                },
                {
                    data: {
                        tld: 'com' + Math.floor(Math.random() * 1000),
                        domainName: 'test.com',
                        available: true,
                    },
                    img: {
                        small: 'https://images.unsplash.com/photo-1682686581427-7c80ab60e3f3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        regular: 'https://images.unsplash.com/photo-1682686581427-7c80ab60e3f3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    }
                }
            ]
        }
    })

    useEffect(() => console.log('data', data), [ data ])

    return (
        <div className="w-full">
            <button onClick={ EXAMPLE_ADD_DATA } className="bg-slate-300 text-4xl p-5">FEED ME AS A BEAST, PLEASE!</button>
            <Popover
                name=".com"
                options={[
                    {
                        title: 'Domain Name',
                        subtitle: 'testafss.com',
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
            <GridMasonry
                data={ data }
                loaded={ loaded }
                addLoaded={ addLoaded }
                theme={ DomainBlock }
            />
        </div>
    )
}