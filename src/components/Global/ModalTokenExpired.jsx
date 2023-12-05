// React
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// Components
import Modal from "../Common/Modal"
import Wrapper from '../Common/Modal/Wrapper'

// Utils
import checkExpire from '@/utils/token'

// Deps
import { useLocalStorage } from 'usehooks-ts'

export default function ModalTokenExpired({}) {

    const [ token, setToken ] = useLocalStorage('token', '')
    const [ isTokenValid, setIsTokenValid ] = useState(true)
    const tokenExpiredRef = useRef()

    useEffect(() => {
        if (!token) return
        (async () => {
            setIsTokenValid(!!(await checkExpire(token)))
        })()
      }, [ token ])

      useEffect(() => {
        if (!isTokenValid) tokenExpiredRef.current?.setAttribute('data-show', 'true')
        else tokenExpiredRef.current?.setAttribute('data-show', 'false')
      }, [ isTokenValid ])


    return (
        <Modal modalRef={ tokenExpiredRef }>
            <Wrapper>
                <h3 className='font-bold text-3xl'>Warning</h3>
                <p className='text-lg md:text-xl mt-1'>Your token seems to be <i className='text-slate-600 font-semibold'>expired/invalid</i><br/>Are you sure to proceed?</p>
                <div className='grid md:grid-cols-2 w-full mt-5 gap-3 md:gap-5'>
                    <button onClick={() => {
                        setToken(undefined)
                        setIsTokenValid(true)
                        }} className='text-slate-900 border-2 border-slate-300 rounded-lg py-4 order-1 font-semibold'>Sure.</button>
                    <Link onClick={() => {
                        setToken(undefined)
                        setIsTokenValid(true)
                        }} href='/login' className='border-2 bg-slate-900 border-slate-900 text-white rounded-lg py-4 md:order-2 font-semibold'>Go back to Login</Link>
                </div>
            </Wrapper>
        </Modal>
    )
}