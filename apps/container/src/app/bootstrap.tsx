import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import App from './app';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }
`;

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  // uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <StrictMode>
    <GlobalStyle />
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
  document.getElementById('root')
);
