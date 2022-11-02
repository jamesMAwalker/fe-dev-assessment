import type { NextPage } from 'next'
import Head from 'next/head'
import { Dashboard } from '../components/dashboard'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>FE Dev - Technical Assessment</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Dashboard />
      </main>
    </div>
  )
}

export default Home
