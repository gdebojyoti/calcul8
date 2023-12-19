const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <nav>
          <ul>
            <li><a href='/'>Home</a></li>
            <li><a href='/emi'>Sample page</a></li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
