// React
import { useReducer } from "react"

// Components
import GridMasonry from "@/components/Common/Apps/Advanced/GridMasonry"
import DomainBlock from "@/components/Common/Apps/Advanced/GridMasonry/Themes/DomainBlock"

const TEST_DATA = [
    {
        name: 'test.com',
        available: true,
        more: {
            registrar: "lorem ipsum",
            lastUpdate: "lorem ipsum"
        }
    },
    {
        name: 'test.org',
        available: false,
        more: {
            registrar: "lorem ipsum",
            lastUpdate: "lorem ipsum"
        }
    },
    {
        name: 'test.net',
        available: true,
        more: {
            registrar: "lorem ipsum",
            lastUpdate: "lorem ipsum"
        }
    },
    {
        name: 'test.bot',
        available: false,
        more: {
            registrar: "lorem ipsum",
            lastUpdate: "lorem ipsum"
        }
    },
    {
        name: 'test.ai',
        available: true,
        more: {
            registrar: "lorem ipsum",
            lastUpdate: "lorem ipsum"
        }
    },
    {
        name: 'test.xyz',
        available: false,
        more: {
            registrar: "lorem ipsum",
            lastUpdate: "lorem ipsum"
        }
    },
    {
        name: 'test.app',
        available: true,
        more: {
            registrar: "lorem ipsum",
            lastUpdate: "lorem ipsum"
        }
    },
    {
        name: 'test.game',
        available: false,
        more: {
            registrar: "lorem ipsum",
            lastUpdate: "lorem ipsum"
        }
    },
]

export default function Test() {

    const handleLoaded = ({ count }) => {
        if (count < TEST_DATA.length - 1) return { done: false, count: count + 1 }
        return { done: true, count: count }
    }

    const [ loaded, addLoaded ] = useReducer(handleLoaded, { done: false, count: 0 })

    return (
        <div className="w-full">
            <GridMasonry
                data={ TEST_DATA }
                loaded={ loaded }
                addLoaded={ addLoaded }
                theme={ DomainBlock }
            />
        </div>
    )
}