import { getAccessToken } from '@auth0/nextjs-auth0' // pega o token do usuario
import httpProxyMiddleware from 'next-http-proxy-middleware';
import { NextApiRequest, NextApiResponse } from 'next'

//* httpProxyMiddleware: lib para criar proxys de requisições http https://www.npmjs.com/package/http-proxy-middleware


export const config = { // o next permite passar o objeto de configuração diferentes das configurações padrão https://nextjs.org/docs/api-routes/api-middlewares#custom-config
  api: {
    bodyParser: false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { accessToken } = await getAccessToken(req, res);

  return httpProxyMiddleware(req, res, {
    target: 'http://localhost:3332/graphql', // url da aplicação gateway
    headers: {
      'Authorization': `Bearer ${accessToken}` // adiciona o token no header
    }
  })
}