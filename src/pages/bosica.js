// Components
import Card from "@/components/Bosica/Card"

export default function Bosica() {

    return (
        <main className="w-screen h-screen flex justify-center relative items-center bg-[#e7e7e7] select-none overflow-hidden">
            <Card
                nome="Bosica"
                età={ 35 }
                lavoro="Grafico"
                distanza="2 km"
                immagine="https://img.freepik.com/free-photo/bohemian-man-with-his-arms-crossed_1368-3542.jpg?w=826&t=st=1695930612~exp=1695931212~hmac=075e859efe8c1e9c8399501c7e42f0fc528e7e339c87c74b59b8b40a4a1c0121"
            />
        </main>
    )
}