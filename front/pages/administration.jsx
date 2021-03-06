import React from 'react'
import Header from '../components/organisms/header/Header'
import Head from 'next/head'
import AdministrationMap from '../components/molecules/AdmistrationMap'
import useLocalStorage from '../hooks/uselocalstorage'
import { useRouter } from 'next/router'



export default function Administration({users}) {

    console.log(users)

    const router = useRouter()

    const LocalStorage = useLocalStorage

    const roles = LocalStorage('roles')[0]

    const back = () => {
      router.push('/')
    }

    return (
        <div>
            <Head>
                <title>Autorate</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            { roles == "admin" && (
              <div>
                <AdministrationMap users={users} />
              </div>
            )}
            
            { roles != "admin" && (
              <div className="flex flex-col">
                <h1 className="text-center text-5xl text-red-600">Unauthorized </h1>

                <button
                    className="ml-auto mr-auto mt-20 w-40 rounded text-xl 
                    bg-white text-red-500 hover:text-red-600"
                    onClick={back}
                >
                    Back to Home
            </button>
            </div>
            )}
        </div>
    )
}


export async function getServerSideProps() {
    const request = await fetch("http://localhost:4000/users")
    .then((res) => res.json())
  
    return {
      props: {
        users: request
      }
    }
  }