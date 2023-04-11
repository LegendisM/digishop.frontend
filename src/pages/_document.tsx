import { createGetInitialProps } from '@mantine/next'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const getInitialProps = createGetInitialProps();

  return (
    <Html lang="en">
      <Head></Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
