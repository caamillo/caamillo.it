import Link from "next/link"
import Image from "next/image"

export default function Card({ post }) {
    return (
        <li className='w-[500px] rounded-lg bg-white'>
            <Image
                src={ post.image }
                className="rounded-tl-lg rounded-tr-lg w-full h-[300px] bg-red-300"
                alt="Post image"
            />
            <div className="p-5">
                <Link href={ '/blog/post/' + post.id } className="font-bold text-3xl cursor-pointer">{ post.title }</Link>
                <p className=" text-lg">{ post.description }</p>
            </div>
        </li>
    )
}