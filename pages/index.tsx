import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut } from 'next-auth/react'

const Home: NextPage = () => {
  const { data, status } = useSession()
  return (
    <>
      <div>
        {status === 'unauthenticated' && (
          <button onClick={() => signIn('google')}>sign in</button>
        )}
        {status === 'authenticated' && (
          <div>
            you are <span>{data.user?.name}</span> |&nbsp;
            <button onClick={() => signOut()}>sign out</button>
          </div>
        )}
      </div>
    </>
  )

}

export default Home
