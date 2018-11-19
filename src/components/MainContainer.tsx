import React from 'react';
import Tab from './Tab';
import { facadeActions } from '../store/actions';

export default class MainContainer extends React.Component<any, any> {

	addTask = (tabId) => () => this.props.dispatch(facadeActions.addTask(tabId));

	removeTask = (tabId) => (taskId) => () => this.props.dispatch(facadeActions.removeTask(tabId, taskId));

	render() {
		const { activeTab, tabs, tasks, dispatch } = this.props;
		const tabToRender = tabs.byId[activeTab];
		const activeTasks = tabToRender.taskIds.map(taskId => tasks.byId[taskId]);

		return (
			<div>
				<Tab 
					tabId={tabToRender.id}
					title={tabToRender.title}
					tasks={activeTasks}
					dispatch={dispatch}
					addTask={this.addTask}
					removeTask={this.removeTask}
				/>
			</div>
		)
	}
}
