import React from 'react';
import Tab from './Tab';
import { facadeActions } from '../store/actions';

export default class MainContainer extends React.Component<any, any> {

	addTask = (tabId) => () => this.props.dispatch(facadeActions.addTask(tabId));

	removeTask = (tabId) => (taskId) => () => this.props.dispatch(facadeActions.removeTask(tabId, taskId));

	renderTab = () => {
		const { tabs, tasks, dispatch } = this.props;
		const activeTab = tabs.find(tab => tab.isActive);
		const activeTasks = activeTab.taskIds.map(taskId => tasks.find(task => task.id === taskId)); // TODO: optimize

		return <Tab 
			tabId={activeTab.id} 
			title={activeTab.title} 
			tasks={activeTasks} 
			dispatch={dispatch} 
			addTask={this.addTask}
			removeTask={this.removeTask}
		/>;
	}

	render() {
		return (
			<div>
				{this.renderTab()}
			</div>
		)
	}
}
