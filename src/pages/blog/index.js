// Deps
import prisma from '../../lib/prisma'

// Components
import BlogLayout from '@/components/Blog/BlogLayout'
import Card from '@/components/Blog/Card'

export default function Blog({ posts }) {
    return (
        <BlogLayout>
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

export async function getStaticProps() {
    const posts = await prisma.post.findMany({})
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts))
        },
    }
}