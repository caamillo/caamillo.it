// Component
import ModalTokenExpired from '@/components/Global/ModalTokenExpired'

// Css
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div>
      <ModalTokenExpired />
      <Component { ...pageProps } />
    </div> 
  )
}
