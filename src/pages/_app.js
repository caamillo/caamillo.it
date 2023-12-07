// React
import { useRouter } from 'next/router'

// Component
import ModalTokenExpired from '@/components/Global/ModalTokenExpired'

// Lib
import { GenericContextProvider } from '@/lib/GenericContext'
import { AppContextProvider } from '@/lib/AppContext'

// Css
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  return (
    <GenericContextProvider>
      <ModalTokenExpired forceLogin={ router.pathname !== '/apps' && router.pathname.startsWith('/apps') } />
      {
        router.pathname.startsWith('/apps') ?
          <AppContextProvider>
            <Component { ...pageProps } />
          </AppContextProvider>
        :
          <Component { ...pageProps } />
      }
    </GenericContextProvider> 
  )
}
