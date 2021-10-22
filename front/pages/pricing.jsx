import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/organisms/header/Header'
import PricingChoice from '../components/organisms/pricing/PricingChoice'

export default function Home() {
  return (
    <div>
        <Head>
            <title>AutoRate</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header/>

        <PricingChoice/>


    </div>
  )
}