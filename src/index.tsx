import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import store from './store';
import TaskList from './components/TaskList';
// import { ApplicationState } from './store/reducer';
import MainContainer from './components/MainContainer';

const connected = {
	MainContainer: connect((state) => (state))(MainContainer),
}

class App extends React.Component<{}, {}> {

	render() {
		return (
			<Provider store={store}>
				<connected.MainContainer />
			</Provider>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));