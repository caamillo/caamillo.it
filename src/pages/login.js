// React
import { useEffect, useState, useRef } from "react"

// Components
import ErrorManager from '@/components/Error'
import Switch from "@/components/Lil/Switch"

// Deps
import { useLocalStorage } from "usehooks-ts"

export default function login() {

    const [ errors, setErrors ] = useState([])
    const [ token, setToken ] = useLocalStorage('token', '') // Shut up, i will use local-storage because yes
    const [ isGuestSelected, setIsGuestSelected ] = useState(true)

    // login-infos
    const name = useRef()
    const secret = useRef()

    const switchCallback = (idx) => {
        setIsGuestSelected(!idx)
        if (!idx) {
            secret.current.disabled = true
            secret.current.type = 'text'
            secret.current.value = 'NOT REQUIRED'
        } else {
            secret.current.disabled = false
            secret.current.value = ''
            secret.current.type = 'password'
        }
    }

    const getAccess = () => {
        const [ sName, sSecret ] = [
            name.current.value.trim(),
            secret.current.value
        ]

        if (!sName || !sSecret) return setErrors(errors =>
                [ ...errors,
                    { title: 'Error', description: 'Name or Secret is empty!' } ]
            )
        fetch('https://api.caamillo.it/token', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: sName,
                pw: isGuestSelected ? 'GUEST' : sSecret
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) return setErrors(errors =>
                        [ ...errors,
                            { title: data.error, description: data.message } ]
                    )
                setToken(data.data)
            })
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
                        <input ref={ name } className="w-full p-3 border-2 rounded-lg text-xl" />
                    </div>
                    <div>
                        <p className="text-xl">SECRET_PW:</p>
                        <input type="text" ref={ secret } defaultValue='NOT REQUIRED' disabled className="w-full p-3 italic border-2 rounded-lg text-xl disabled:text-slate-500  disabled:border-[#00000020] disabled:bg-[#00000020]" />
                    </div>
                    <div>
                        <Switch
                            callback={ switchCallback }
                            options={[
                                'guest',
                                'admin'
                            ]}
                        />
                    </div>
                    <button onClick={ getAccess } className="w-full p-5 bg-[#352F44] text-xl font-bold shadow-md rounded-lg text-white">Login</button>
                </div>
            </div>
            <ErrorManager errors={ errors } setErrors={ setErrors } />
        </div>
    )
}