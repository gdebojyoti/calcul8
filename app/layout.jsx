import Link from '../components/Link'

import './globals.css'

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <nav>
          <ul>
            <li><Link href='/'>Home</Link></li>
            <li><Link href='/emi'>Sample page</Link></li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
