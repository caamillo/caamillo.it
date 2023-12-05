// React
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {

  return (
    <Html lang="it">
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Noto+Serif:700,700italic' rel='stylesheet' type='text/css' />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
