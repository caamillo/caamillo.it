// React
import Head from "next/head"

export default function Home() {

  return (
    <div>
      <Head>
          <meta name="title" content="caamillo" />
          <meta name="description" content="A useless website" />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://caamillo.it/" />
          <meta property="og:title" content="caamillo" />
          <meta property="og:description" content="A useless website" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://caamillo.it/bosica/" />
          <meta property="twitter:title" content="caamillo" />
          <meta property="twitter:description" content="A useless website" />
      </Head>
      <div className="fixed w-screen h-screen flex justify-center items-center">
        It's empty there :)
      </div>
    </div>
  )
}
