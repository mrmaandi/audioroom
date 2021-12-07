import Head from 'next/head'
import Header from '../components/Header'

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Audiorooms</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        test
        <Header />
      </main>
    </div>
  )
}
