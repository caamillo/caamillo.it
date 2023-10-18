// React
import Link from "next/link"
import Image from "next/image"

// Components
import Badge from "./Badge"
import BadgeScroller from "./BadgeScroller"

export default function Card({ post }) {
    return (
        <li className='w-full md:w-[400px] xl:w-[500px] rounded-lg bg-white shadow-sm md:mx-0'>
            <Image
                src={ post.image }
                className="rounded-tl-lg rounded-tr-lg w-full h-[300px] bg-slate-300"
                alt="Post image"
            />
            <div className="p-5 flex flex-col justify-between h-auto min-h-[300px] md:min-h-auto md:h-[300px] xl:h-[250px]">
                <div>
                    <BadgeScroller>
                        {
                            post.tags.map(tag =>
                                <Badge key={ 'b-' + tag }>{ tag }</Badge>
                            )
                        }
                    </BadgeScroller>
                    <Link href={ '/blog/post/' + post.id } className="font-bold text-3xl transition-colors hover:text-slate-600 cursor-pointer">{ post.title }</Link>
                    <p className="blog-description text-lg text-slate-500 cursor-default">
                        { (post.description).slice(0, 150) }
                        { post.description.length > 150 ? <span className="inline md:hidden">...</span> : '' }
                    </p>
                </div>
                <div className="w-full flex justify-end items-center mt-5 relative">
                    <div className="absolute w-full h-6 -top-[4.40rem] xl:-top-12 right-0 gradient-blur bg-white hidden md:block"></div>
                    <Link href={ '/blog/post/' + post.id } className="font-bold transition-colors hover:text-slate-800 text-lg text-slate-600 select-none">Read more</Link>
                </div>
            </div>
        </li>
    )
}