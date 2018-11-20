import React from 'react';
import { Dispatch } from 'redux';
import { Task } from '../store/reducer';
import TaskList from './TaskList';

interface TabProps {
	dispatch: Dispatch,
	title: string,
	tabId: number,
	tasks: Task[],
	addTask: (tabId: number) => any,
	removeTask: (tabId: number) => any,
}

export default class Tab extends React.Component<TabProps, {}> {

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
