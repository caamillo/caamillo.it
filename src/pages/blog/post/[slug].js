// React
import { useEffect, useRef } from 'react';
import Link from 'next/link'
import Head from 'next/head';

// Deps
import { MdPreview, MdCatalog } from 'md-editor-rt';
import 'md-editor-rt/lib/preview.css';
import prisma from '@/lib/prisma'

// Components
import BlogLayout from '@/components/Blog/BlogLayout'
import NsfwModal from '@/components/Blog/NsfwModal';

export default function Post({ post }) {

    return (
        <BlogLayout>
            <Head>
                <title>FemboyBlog | { post.title }</title>
                <meta name="title" content={`FemboyBlog | ${ post.title }`} />
                <meta name="description" content={`FemboyBlog | ${ post.description }`} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://caamillo.it/blog/${ post.id }`} />
                <meta property="og:title" content={`FemboyBlog | ${ post.title }`} />
                <meta property="og:description" content={`FemboyBlog | ${ post.description }`} />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={`https://caamillo.it/blog/${ post.id }`} />
                <meta property="twitter:title" content={`FemboyBlog | ${ post.title }`} />
                <meta property="twitter:description" content={`FemboyBlog | ${ post.description }`} />
            </Head>
            <NsfwModal tags={ post.tags } />
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