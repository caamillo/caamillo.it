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
    }
]

export default function Test() {

    return (
        <div className="w-full">
            <GridMasonry data={ TEST_DATA } />
        </div>
    )
}