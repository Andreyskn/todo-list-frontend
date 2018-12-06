import React from 'react';
import { Dispatch } from 'redux';
import { Task } from '../store/reducer';
import { Button } from './base-ui';
import TaskList from './TaskList';
import { facadeActions } from '../store/actions';

interface TabProps {
	dispatch: Dispatch;
	title: string;
	tabId: string;
	tasks: Task[];
}

interface TabState {
	renamingMode: boolean;
}

export default class Tab extends React.Component<TabProps, TabState> {
	state = {
		renamingMode: false,
	};

	addTask = (tabId: string) => () => this.props.dispatch(facadeActions.addTask(tabId));

	removeTask = (tabId: string) => (taskId: string) => () => this.props.dispatch(facadeActions.removeTask(tabId, taskId));

	setRenameMode = (renamingMode: boolean) => this.setState({ renamingMode });

	renameTab = (e) => {
		const { tabId, dispatch } = this.props;
		const newTitle = e.target.value.trim();
		dispatch(facadeActions.updateTabTitle(tabId, newTitle));
		this.setRenameMode(false);
	};

	onEnterPress = (e) => e.charCode === 13 && this.renameTab(e);

	render() {
		const { title, tabId, tasks, dispatch } = this.props;
		const { renamingMode } = this.state;

		return (
			<div>
				<Button text='Rename' onClick={() => this.setRenameMode(true)} />
				{renamingMode ? (
					<input type='text' autoFocus={true} defaultValue={title} onBlur={this.renameTab} onKeyPress={this.onEnterPress} />
				) : (
					<span>{title}</span>
				)}
				<TaskList tasks={tasks} dispatch={dispatch} addTask={this.addTask(tabId)} removeTask={this.removeTask(tabId)} />
			</div>
		);
	}
}
