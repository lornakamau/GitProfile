import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache, ApolloLink} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import {environment as env} from '../secrets';

const uri = 'https://api.github.com/graphql'; 

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {

  const auth = setContext((operation, context) => ({
    headers: {
      Authorization: `bearer ${env.TOKEN}`
    },
  }));
  const link = ApolloLink.from([auth, httpLink.create({ uri })]);

  return {
    link,
    cache: new InMemoryCache(),
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
