import React from 'react';
import ReactDOM from 'react-dom';

import { ConnectedRouter } from 'connected-react-router';
import { withRouter } from 'react-router';
import { Provider, connect } from 'react-redux';
import { store, history } from './store';
import { ApplicationState } from './store/reducer';

import { MainContainer } from './components/MainContainer';

import { Normalize } from 'styled-normalize';
import { GlobalStyle } from './styles';

interface State {
  router: any;
  application: ApplicationState;
}

const connected = {
  MainContainer: withRouter(connect((state: State) => state)(MainContainer)),
};

class App extends React.Component<{}, {}> {
  render() {
    return (
      <React.Fragment>
        <Normalize />
        <GlobalStyle />
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <connected.MainContainer />
          </ConnectedRouter>
        </Provider>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
