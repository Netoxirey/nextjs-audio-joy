import Footer from './components/Footer'
import NavBar from './components/NavBar'
import './styles/globals.css'
import { Poppins} from 'next/font/google'
import StoreProvider from './context/StoreProvider'

const poppins = Poppins({
  weight: ['400','700','900'],
  subsets: ['latin']
})

export const metadata = {
  title: 'Audio Joy',
  description: 'An online store for audio equipment',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <head>
        <link rel='icon' href='/headphone-logo.svg' />
      </head>
      <body className={poppins.className}>
        <StoreProvider>
        <NavBar />
        {children}
        <Footer />
        </StoreProvider>
      </body>
    </html>
  )
}
