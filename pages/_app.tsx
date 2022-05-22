import '../styles/globals.css'

import { NextComponentType } from 'next'
import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'


const _App: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  return (
    <SessionProvider session={session}>
          <Component {...pageProps} />
    </SessionProvider>
  )
}

export default _App
