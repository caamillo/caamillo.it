// React
import { useState, useEffect, useRef } from "react"
import Link from "next/link"

// Components
import Modal from "../Common/Modal"
import Wrapper from "../Common/Modal/Wrapper"

// Deps
import { useLocalStorage } from "usehooks-ts"

export default function NsfwModal({ tags }) {

    const nsfwModalRef = useRef()

    const [ nsfw, setNsfw ] = useLocalStorage('nsfw', false)

    useEffect(() => {
        if (!nsfw && tags.filter(tag => tag.toLowerCase() === 'nsfw').length) setTimeout(() => nsfwModalRef.current?.setAttribute('data-show', 'true'), 5e2)
        else nsfwModalRef.current?.setAttribute('data-show', 'false')
    }, [ nsfw ])
    
    return (
        <Modal modalRef={ nsfwModalRef }>
            <Wrapper>
                <h3 className='font-bold text-3xl'>Warning</h3>
                <p className='text-lg md:text-xl mt-1'>This post may includes some <i className=' text-slate-600 font-semibold'>#NSFW</i> content.<br/>Are you sure to proceed?</p>
                <div className='grid md:grid-cols-2 w-full mt-5 gap-3 md:gap-5'>
                    <Link href='/blog' className='border-2 border-slate-300 text-slate-900  rounded-lg py-4 order-1 font-semibold'>Go Back</Link>
                    <button onClick={ () => setNsfw(true) } className='bg-slate-900 text-white border-2 border-slate-900 rounded-lg py-4 md:order-2 font-semibold'>Sure.</button>
                </div>
            </Wrapper>
        </Modal>   
    )
}