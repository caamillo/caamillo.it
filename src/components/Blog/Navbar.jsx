import Link from "next/link"

export default function Navbar() {
    return (
        <div className="fixed top-0 left-0 w-full h-[var(--blog-nav-size)] flex justify-center items-center bg-[#353e4ed1] backdrop-blur-lg">
            <Link href={ '/blog' } className="text-white font-bold text-4xl">FemboyBlog</Link>
        </div>
    )
}