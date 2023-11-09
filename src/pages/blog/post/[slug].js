// React
import { useEffect, useRef } from 'react';
import Link from 'next/link'

// Deps
import { MdPreview, MdCatalog } from 'md-editor-rt';
import 'md-editor-rt/lib/preview.css';
import prisma from '@/lib/prisma'
import { useLocalStorage } from 'usehooks-ts';

// Components
import BlogLayout from '@/components/Blog/BlogLayout'

export default function Post({ post }) {

    const [ nsfw, setNsfw ] = useLocalStorage('nsfw', false)
    const nsfwModalRef = useRef()

    useEffect(() => {
        if (!nsfw && post.tags.filter(tag => tag.toLowerCase() === 'nsfw').length) setTimeout(() => nsfwModalRef.current?.setAttribute('data-show', 'true'), 5e2)
        else nsfwModalRef.current?.setAttribute('data-show', 'false')
    }, [ nsfw ])

    return (
        <BlogLayout>
            <div ref={ nsfwModalRef } data-show="false" className="nsfw-warning w-full h-full fixed top-0 left-0 duration-500 z-[999999] transition-all">
                <div className='absolute top-0 left-1/2 -translate-x-1/2 container flex justify-center'>
                    <div className='warning-modal transition-transform duration-1000 ease-in-out bg-white w-full lg:w-2/3 xl:w-1/2 p-5 rounded-lg mt-10 mx-3 border-2 border-slate-300 flex flex-col items-center text-center'>
                        <h2 className='font-bold text-3xl'>Warning</h2>
                        <p className='text-lg md:text-xl mt-1'>This post may includes some <i className=' text-slate-600 font-semibold'>#NSFW</i> content.<br/>Are you sure to proceed?</p>
                        <div className='grid md:grid-cols-2 w-full mt-5 gap-3 md:gap-5'>
                            <Link href='/blog' className='border-2 border-slate-300 text-slate-700  rounded-lg py-4 order-1 font-semibold'>Go Back</Link>
                            <button onClick={ () => setNsfw(true) } className='bg-slate-900 text-white border-2 border-slate-900 rounded-lg py-4 md:order-2 font-semibold'>Sure.</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white p-5 rounded-lg shadow-sm'>
                <h1 className='text-4xl font-bold'>{ post.title }</h1>
                <h2 className='text-xl font-medium'>{ post.description }</h2>
                <div className='mt-3'>
                    <MdPreview
                        editorId='preview-only'
                        modelValue={ post.content }
                        language='en-US'
                    />
                </div>
                <p className='mt-5 font-bold text-slate-600'>Tags:</p>
                <div className='w-full flex flex-wrap gap-3 mt-3'>
                    {
                        post.tags.map(tag => 
                            <div className='flex rounded-lg h-8 bg-slate-300' key={ 'tag-' + tag }>
                                <div className='px-2 h-full flex items-center justify-center'>
                                    <span className='font-bold text-slate-600'>#</span>
                                </div>
                                <div className='px-3 flex items-center justify-center bg-slate-600 rounded-tr-lg rounded-br-lg'>
                                    <h3 className='font-medium text-slate-300'>{ tag }</h3>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className='w-full md:flex justify-between mt-5 text-sm font-medium text-slate-500 text-center'>
                    <div>
                        <span className='text-slate-600 hidden md:inline font-bold'>Author: </span>
                        <span>{ post.author }</span>
                    </div>
                    <span className=' capitalize'>{ new Date(post.createdAt).toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false, minute:'2-digit'}).split(', ').join(' ') }</span>
                </div>
            </div>
            <div className='w-full flex justify-center my-5'>
                <Link href='/blog' className='bg-slate-300 font-medium text-lg text-center w-full lg:w-auto rounded-lg lg:px-10 py-2 text-slate-600'>Go Back</Link>
            </div>
        </BlogLayout>
    )
}

export async function getServerSideProps(context) {
    const { slug } = context.params

    const post = await prisma.post.findUnique({
        where: {
            id: slug
        }
    })

    return {
        props: {
            post: JSON.parse(JSON.stringify(post))
        },
    }
}