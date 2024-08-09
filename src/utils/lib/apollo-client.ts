import { ApolloClient, DefaultOptions, HttpLink, InMemoryCache } from '@apollo/client';

import { removeLastTrailingSlash } from '@/utils/helpers/functions';
let client: ApolloClient<object>;

/**
 * getApolloClient
 */

export function getApolloClient() {
  if (!client) {
    client = _createApolloClient();
  }
  return client;
}

/**
 * createApolloClient
 */

export function _createApolloClient() {
  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
      notifyOnNetworkStatusChange: true
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }

  return new ApolloClient({
    link: new HttpLink({
      uri: removeLastTrailingSlash(process.env.WORDPRESS_GRAPHQL_ENDPOINT),
    }),
    cache: new InMemoryCache({
      typePolicies: {
        RootQuery: {
          queryType: true,
        },
        RootMutation: {
          mutationType: true,
        },
      },
    }),
    defaultOptions: defaultOptions,
  });
}
