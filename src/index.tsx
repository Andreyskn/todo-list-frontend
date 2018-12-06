import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import store from './store';
import { ApplicationState } from './store/reducer';
import MainContainer from './components/MainContainer';
import { Normalize } from 'styled-normalize';

const connected = {
	MainContainer: connect((state: ApplicationState) => state)(MainContainer),
};

class App extends React.Component<{}, {}> {
	render() {
		return (
			<React.Fragment>
				<Normalize />
				<Provider store={store}>
					<connected.MainContainer />
				</Provider>
			</React.Fragment>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
