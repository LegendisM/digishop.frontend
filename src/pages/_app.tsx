import '@/styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ColorScheme, MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { AuthProvider } from '@/components/common/auth';
import { useLocalStorage } from '@mantine/hooks';

export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) => {
    return setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{
            colorScheme,
            colors: {
              dark: [
                '#d5d7e0',
                '#acaebf',
                '#8c8fa3',
                '#666980',
                '#4d4f66',
                '#34354a',
                '#2b2c3d',
                '#1d1e30',
                '#0c0d21',
                '#01010a',
              ],
            },
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}
