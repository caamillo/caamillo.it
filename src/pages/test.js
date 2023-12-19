// Components
import GridMasonry from "@/components/Common/Apps/Advanced/GridMasonry"

const TEST_DATA = [
    {
        name: '1',
    },
    {
        name: '2',
    },
    {
        name: '3',
    },
    {
        name: '4',
    },
    {
        name: '5',
    },
    {
        name: '6',
    },
    {
        name: '7',
    },
    {
        name: '8',
    },
    {
        name: '9',
    },
    {
        name: '10',
    },
    {
        name: '11',
    },
    {
        name: '12',
    },
    {
        name: '13',
    },
    {
        name: '14',
    },
    {
        name: '15',
    },
]

export default function Test() {

    return (
        <div className="w-full">
            <GridMasonry data={ TEST_DATA } />
        </div>
    )
}