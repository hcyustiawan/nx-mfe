import styled from 'styled-components';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ApplicationApp from './ApplicationApp';
import NxWelcome from './nx-welcome';
import Login from './Login/Login';

const StyledApp = styled.div`
  height: 100%;
  width: 100%;
`;
const history = createBrowserHistory();
export function App() {
  return (
    <StyledApp>
      <Router history={history}>
        <Switch>
          <Route exact path="/application">
            <NxWelcome title="container" />
            <ApplicationApp />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </StyledApp>
  );
}

export default App;
