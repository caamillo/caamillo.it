// React
import { useEffect } from 'react'

// Components
import Navbar from './Navbar'
import Footer from './Footer'

export default function BlogLayout({ children }) {

    useEffect(() => {
        document.body.classList.add('bg-slate-500')
        return () => {
            document.body.classList.remove('bg-slate-500')
        }
    }, [])

    return (
        <div className='w-screen min-h-screen flex flex-col items-center justify-between'>
            <Navbar />
            <div className="container w-full mt-[calc(var(--blog-nav-size)+1.5rem)]">
                { children }
            </div>
            <Footer />
        </div>
    )
}