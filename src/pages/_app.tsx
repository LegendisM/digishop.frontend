import '@/styles/globals.css'
import { NextUIProvider, createTheme } from '@nextui-org/react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}
