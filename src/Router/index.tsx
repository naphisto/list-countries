import React from 'react';
import { Router } from '@reach/router';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Countries from '../pages/Countries';
import Country from '../pages/Country';

const client = new ApolloClient({
  uri: 'https://countries-274616.ew.r.appspot.com/',
  cache: new InMemoryCache(),
});

const AppRouter: React.FC = () => (
  <div className="p-10">
    <ApolloProvider client={client}>
      <Router>
        <Countries path="/" />
        <Country path="/:country" />
      </Router>
    </ApolloProvider>
  </div>
);

export default AppRouter;
