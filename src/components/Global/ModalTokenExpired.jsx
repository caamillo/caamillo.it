// React
import { useEffect, useRef, useContext } from 'react'
import Link from 'next/link'

// Components
import Modal from "../Common/Modal"
import Wrapper from '../Common/Modal/Wrapper'

// Context
import { GenericContext } from "@/lib/GenericContext"

export default function ModalTokenExpired({ forceLogin=false }) {

    const tokenExpiredRef = useRef()
    const { setToken, isTokenValid, setIsTokenValid } = useContext(GenericContext)

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