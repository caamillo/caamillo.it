import Link from "next/link"

export default function Navbar() {
    return (
        <div className="fixed top-0 left-0 w-full z-[999999] h-[var(--blog-nav-size)] flex justify-start md:justify-center items-center bg-[#353e4ed1] backdrop-blur-lg">
            <Link href={ '/blog' } className="text-white font-bold text-4xl mx-5">FemboyBlog5</Link>
        </div>
    )
}