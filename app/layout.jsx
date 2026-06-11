import "./globals.css";

const RootLayout = ({children}) => {
  return (
    <html>
      <body>
        <header>
        </header>
        <main>
          {children}
        </main>
        <footer></footer>
      </body>
    </html>
  )
}

export default RootLayout