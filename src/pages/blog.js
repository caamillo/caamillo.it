import prisma from '../lib/prisma'

export default function Blog({ posts }) {
    return (
      <ul>
        {
            posts.map(post => {
                return (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </li>
                )
            })
        }
      </ul>
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