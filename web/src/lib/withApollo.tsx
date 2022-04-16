/*

* esta será um componente que recebe um componente como propriedade e retorna um componente com o apollo
* HOC: Higher Order Component (Componente de alta ordem)  - Componente que recebe outro componente como parâmetro


*/

import { ApolloClient, ApolloProvider, createHttpLink, from, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { GetServerSidePropsContext, NextPage } from "next";

export type ApolloClientContext = GetServerSidePropsContext;

// Componente que permite acessar o cliente após o SSR

export const withApollo = (Component: NextPage) => { // recebe um componente como parâmetro do tipo NextPage


  return function Provider(props: any) { // retorna um outro componente
    return (
      <ApolloProvider client={getApolloClient(undefined, props.apolloState) /*apolloState:  stado do cache que definidos na funcao getServerSideProps do componente recebido como parametro  */ } > 
        <Component />
      </ApolloProvider>
    )
  }
}

export function getApolloClient( // esta função retorna um cliente após o SSR
  ctx?: ApolloClientContext,
  ssrCache?: NormalizedCacheObject // variavel para manter o cache do ssr e do csr
) {

  const httpLink = createHttpLink({ // createHttpLink é um método do ApolloClient que cria um link http
    uri: 'http://localhost:3000/api', // url da propia api do next, fazemos isso para podermos usar o proxy em \src\pages\api\index.ts
    fetch: fetch, // fetch é uma função que permite fazer requisições http
  })
  
  const cache = new InMemoryCache().restore( // cria um cache do tipo in-memory
    ssrCache ?? {} // se o ssrCache existir, usa o cache do ssr, senão, cria um cache vazio
    )   
    
  return new ApolloClient({
    link: from([httpLink]),
    cache,
  })
}

