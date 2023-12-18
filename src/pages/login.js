// React
import { useEffect, useState, useRef, useContext } from "react"
import Image from "next/image"
import Link from "next/link"

// Components
import Switch from "@/components/Lil/Switch"
import Modal from "@/components/Common/Modal"
import EmptyWrapper from "@/components/Common/Modal/EmptyWrapper"
import Wrapper from "@/components/Common/Modal/Wrapper"

// Context
import { GenericContext } from "@/lib/GenericContext"

// Utils
import { parse, logout } from "@/utils/token"

export default function login() {

    const { errors, setErrors, token, setToken } = useContext(GenericContext)
    const [ isGuestSelected, setIsGuestSelected ] = useState(true)
    const [ isTokenForwarded, setIsTokenForwarded ] = useState(false)
    const authenticatedRef = useRef()
    const alreadyLoggedRef = useRef()

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
        fetch(`${ process.env.NEXT_PUBLIC_API_ENDPOINT }/token`, {
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
                if (data.title === 'forward') return setIsTokenForwarded(true)
                authenticatedRef.current.setAttribute('data-show', true)
            })
    }

    useEffect(() => {
        if (isTokenForwarded) alreadyLoggedRef.current.setAttribute('data-show', 'true')
        else alreadyLoggedRef.current.setAttribute('data-show', 'false')
    }, [ isTokenForwarded ])

    useEffect(() => {
        document.querySelector('body').style.background = 'linear-gradient(45deg, #352F44, #00000090)'
    }, [])

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Modal modalRef={ alreadyLoggedRef }>
                <Wrapper>
                    <h3 className='font-bold text-3xl'>Warning</h3>
                    <p className='text-lg md:text-xl mt-1'>It seems your previous token was not expired.</p>
                    <p className='text-lg md:text-xl mt-1'>Want to use it back?</p>
                    <div className='grid md:grid-cols-2 w-full mt-5 gap-3 md:gap-5'>
                        <button onClick={
                            () => {
                                setIsTokenForwarded(false)
                                setTimeout(() => {
                                    authenticatedRef.current.setAttribute('data-show', true)
                                }, 5e2)
                            }
                        } className='bg-slate-900 border-slate-900 text-white border-2 rounded-lg py-4 order-2 font-semibold'>Sure.</button>
                        <button onClick={
                            async () => {
                                setIsTokenForwarded(false)
                                await logout(token, setToken)
                                getAccess()
                            }
                        } className='border-2 text-slate-900 border-slate-300 rounded-lg py-4 order-1 font-semibold'>Nope</button>
                    </div>
                </Wrapper>
            </Modal>
            <Modal modalRef={ authenticatedRef } className='auth'>
                <EmptyWrapper className='h-screen justify-center transition-opacity duration-500'>
                    <div className="flex justify-center items-center space-x-5">
                        <Image
                            src='/icons/Modal/success.svg'
                            width='100'
                            height='100'
                            alt='success'
                        />
                        <div className="text-start text-[#fff9e3]">
                            <h3 className="text-5xl font-bold">Great!</h3>
                            <h3 className="text-4xl font-light mt-1">You are successfully authenticated as <span className=" font-bold" suppressHydrationWarning>{ parse(token)?.name }</span>.</h3>
                            <Link className="text-xl block mt-5 w-fit border-2 border-[#fff9e3] px-3 py-1 rounded-lg" href='/apps'>Go to Apps</Link>
                        </div>
                    </div>
                </EmptyWrapper>
            </Modal>
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
        </div>
    )
}