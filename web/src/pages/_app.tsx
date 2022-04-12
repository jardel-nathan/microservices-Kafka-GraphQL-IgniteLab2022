import { UserProvider } from '@auth0/nextjs-auth0' // UserProvider Permite que todos os componentes tenham acesso ao usuário

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
