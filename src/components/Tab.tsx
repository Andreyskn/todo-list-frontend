import React from 'react';
import { Dispatch } from 'redux';
import { Task } from '../store/reducer';
import { Button } from './base-ui';
import TaskList from './TaskList';
import { facadeActions } from '../store/actions';

interface TabProps {
	dispatch: Dispatch,
	title: string,
	tabId: number,
	tasks: Task[],
}

interface TabState {
	renameMode: boolean,
}

export default class Tab extends React.Component<TabProps, TabState> {

	state = {
		renameMode: false,
	}

	addTask = (tabId: number) => () => this.props.dispatch(facadeActions.addTask(tabId));

	removeTask = (tabId: number) => (taskId: number) => () => this.props.dispatch(facadeActions.removeTask(tabId, taskId));

	setRenameMode = (renameMode: boolean) => this.setState({ renameMode });

	renameTab = (e) => {
		const { tabId, dispatch } = this.props;
		const newTitle = e.target.value;
		dispatch(facadeActions.updateTabTitle(tabId, newTitle));
		this.setRenameMode(false);
	};

	onEnterPress = (e) => e.charCode === 13 && this.renameTab(e);

	render() {
		const { title, tabId, tasks, dispatch } = this.props;
		const { renameMode } = this.state;

		return (
			<div>
				<Button text='Rename' onClick={() => this.setRenameMode(true)} />
				{renameMode ? <input type='text' autoFocus defaultValue={title} onBlur={this.renameTab} onKeyPress={this.onEnterPress}/> : <span>{title}</span>}
				<TaskList tasks={tasks} dispatch={dispatch} addTask={this.addTask(tabId)} removeTask={this.removeTask(tabId)} />
			</div>
		)
	}
}
