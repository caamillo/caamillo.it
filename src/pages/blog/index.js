// Deps
import prisma from '@/lib/prisma'

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

export async function getServerSideProps() {
    const posts = await prisma.post.findMany({})
    console.log(posts)
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts))
        },
    }
}