import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import store from './store';
import TaskList from './components/TaskList';
import Tab from './components/Tab';
import { ApplicationState } from './store/reducer';

const connected = {
	TaskList: connect((state: ApplicationState) => ({ tasks: state.tasks }))(TaskList),
	// Tab: connect((state: ApplicationState) => ({ tabs: state.tabs, tasks: state.tasks }))(Tab),
}

class App extends React.Component<{}, {}> {

	render() {
		return (
			<Provider store={store}>
				<connected.TaskList />
				{/* <connected.Tab /> */}
			</Provider>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));