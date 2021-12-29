import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './app';

type MountOptions = {
  client: ApolloClient<any>;
};
const mount = (el: HTMLElement | null, opt: MountOptions) => {
  const { client } = opt;

  ReactDOM.render(
    <StrictMode>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </StrictMode>,
    el
  );
};

if (process.env['NODE_ENV'] === 'development') {
  const el = document.getElementById('dev-root');
  if (el) {
    mount(el, {
      client: new ApolloClient({
        uri: 'https://api.spacex.land/graphql/',
        cache: new InMemoryCache(),
      }),
    });
  }
}

export { mount };
