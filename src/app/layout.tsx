
import Footer from "./components/footer/Footer"
import Icons from "./components/icons/page"
import Navbar from "./components/navbar/Navbar"
import './home.css'

export const metadata = {
  title : 'Car Workshop',
  description:'Created By Anshul Gaur'
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}){
  
  return(
    <html lang="en" className="bg-black font-sans antialiased">
      <head>
        {/* Forces the browser to upgrade any insecure HTTP requests to HTTPS */}
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </head>
      <body>
        <Navbar />
        <Icons />
        {children}    
        <Footer />
      </body>
    </html>
  )
}