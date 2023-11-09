// React
import Head from 'next/head'

// Deps
import prisma from '@/lib/prisma'

// Components
import BlogLayout from '@/components/Blog/BlogLayout'
import Card from '@/components/Blog/Card'

export default function Blog({ posts }) {
    return (
        <BlogLayout>
            <Head>
                <title>FemboyBlog</title>
                <meta name="title" content="FemboyBlog" />
                <meta name="description" content="Just a random blog, caamillo" />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://caamillo.it/blog/" />
                <meta property="og:title" content="FemboyBlog" />
                <meta property="og:description" content="Just a random blog, caamillo" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://caamillo.it/blog/" />
                <meta property="twitter:title" content="FemboyBlog" />
                <meta property="twitter:description" content="Just a random blog, caamillo" />
            </Head>
            <ul className='w-full h-fit flex justify-center flex-wrap gap-5'>
                {
                    posts.map(post => {
                        return (
                            <Card key={ post.id } post={ post } />
                        )
                    })
                }
            </ul>
        </BlogLayout>
    )
  }

export async function getServerSideProps() {
    const posts = await prisma.post.findMany({})
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts))
        },
    }
}