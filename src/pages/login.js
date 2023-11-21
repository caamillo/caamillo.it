// React
import { useEffect } from "react"

// Lib
import ErrorManager from '../components/Error'

export default function login () {

    const getAccess = () => {

    }

    useEffect(() => {
        document.querySelector('body').style.background = 'linear-gradient(45deg, #352F44, #00000090)'
    }, [])

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="container w-full h-full flex justify-center items-center">
                <div className="w-full mx-3 md:mx-0 md:w-1/2 bg-white rounded-lg p-5 space-y-5">
                    <h1 className="text-3xl">Login to <b>api.caamillo.it</b></h1>
                    <div>
                        <p className="text-xl">Name:</p>
                        <input className="w-full p-3 border-2 rounded-lg text-xl" />
                    </div>
                    <div>
                        <p className="text-xl">SECRET_PW:</p>
                        <input className="w-full p-3 border-2 rounded-lg text-xl" />
                    </div>
                    <button className="w-full p-5 bg-[#352F44] text-xl rounded-lg text-white">Login</button>
                </div>
            </div>
            <ErrorManager />
        </div>
    )
}