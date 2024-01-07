// import Link from '../components/Link'

import './globals.css'

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link href='https://fonts.googleapis.com/css2?family=Italiana&family=Poppins:wght@400;700&family=Roboto:wght@400;500&display=swap' rel='stylesheet' />
      </head>
      <body>
        {/* <nav>
          <ul>
            <li><Link href='/'>Home</Link></li>
            <li><Link href='/emi'>Sample page</Link></li>
          </ul>
        </nav> */}
        {children}
      </body>
    </html>
  )
}

export default RootLayout
