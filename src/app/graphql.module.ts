import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache, ApolloLink} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
const uri = 'https://api.github.com/graphql'; 
import {environment as env} from '../secrets';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const basic = setContext((operation, context) => ({
    headers: {
      'Content-Type': 'application/json'
    }
  }));

  const auth = setContext((operation, context) => ({
    headers: {
      Authorization: `Bearer ${env.TOKEN}`
    },
  }));
  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();
  return {
    link,
    cache,
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
