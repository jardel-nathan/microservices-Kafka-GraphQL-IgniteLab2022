import { getAccessToken, getSession, useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'


export default function home() {

 const { user } = useUser();

 return (
  <div>
   <h1>Hello World</h1>
   <pre>
    {JSON.stringify(user, null, 2)}
   </pre>
   <a href="api/auth/logout">logout</a>
  </div>
 )


}


// export const getServerSideProps = withPageAuthRequired()

export const getServerSideProps = async ({ req, res }) => {

 const token = getAccessToken(req, res);
 const session = getSession(req, res);
 console.log(token, session)

 if (!session) {
  return {
   redirect: {
    destination: '/api/auth/login',
    permanent: false
   }
  }
 }

 return {
  props: {}
 }


}