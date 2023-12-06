// Component
import ModalTokenExpired from '@/components/Global/ModalTokenExpired'

// Lib
import { GenericContextProvider } from '@/lib/GenericContext'

// Css
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <GenericContextProvider>
      <ModalTokenExpired />
      <Component { ...pageProps } />
    </GenericContextProvider> 
  )
}
