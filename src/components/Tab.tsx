import React from 'react';
import TaskList from './TaskList';

export default class Tab extends React.Component<any, any> {

	render() {
		const { title, tabId, tasks, dispatch, addTask, removeTask } = this.props;

		return (
			<div>
				{title}
				<TaskList tasks={tasks} dispatch={dispatch} addTask={addTask(tabId)} removeTask={removeTask(tabId)} />
			</div>
		)
	}
}
