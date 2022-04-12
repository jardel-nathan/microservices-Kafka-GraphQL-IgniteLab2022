import { getAccessToken, getSession, useUser } from '@auth0/nextjs-auth0';
import Head from 'next/head'
import Image from 'next/image'


export default function Home() {

  const { user } = useUser();

  return null;
}

export const getServerSideProps = async ({req, res}) => {


  const session = getSession(req, res);

  if (!session) {
    return {
      redirect:{
        destination: '/api/auth/login',
        permanent: false
      }
    }
  }

  return {
    redirect:{
      destination: '/app',
      permanent: false
    }
  }
}

