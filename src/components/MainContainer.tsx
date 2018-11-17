import React from 'react';
import Tab from './Tab';
import { actions } from '../store/actions';

export default class MainContainer extends React.Component<any, any> {

	generateId = {
		task: () => Math.max(...this.props.tasks.map(t => t.id)) + 1,
		tab: () => Math.max(...this.props.tabs.map(t => t.id)) + 1,
	}

	createEmptyTask = (id) => ({ id, title: '', done: false });

	addTask = (tabId) => () => {
		const { tabs, tasks, dispatch } = this.props;
		const newTaskId = this.generateId.task();
		const taskList = [...tasks, this.createEmptyTask(newTaskId)];
		const tabList = tabs.map(tab => tab.id === tabId ? { ...tab, taskIds: [...tab.taskIds, newTaskId] } : tab);

		dispatch(actions.addTask({ tasks: taskList, tabs: tabList }));
	}

	removeTask = (tabId) => (taskId) => () => {
		const { tasks, tabs, dispatch } = this.props;

		const activeTab = tabs.find(tab => tab.id === tabId);
		const hasSingleTask = activeTab.taskIds.length === 1;

		if (hasSingleTask && !tasks[0].title && !tasks[0].done) return;

		const taskList = tasks.filter(task => task.id !== taskId);

		let newTaskId;
		if (hasSingleTask) {
			newTaskId = this.generateId.task();
			taskList.push(this.createEmptyTask(newTaskId));
		}

		const updateTaskIds = (taskIds) => {
			const filtered = taskIds.filter(tId => tId !== taskId);
			return newTaskId ? [...filtered, newTaskId] : filtered;
		}
		const tabList = tabs.map(tab => tab.id === tabId ? { ...tab, taskIds: updateTaskIds(tab.taskIds) } : tab);

		dispatch(actions.removeTask({ tasks: taskList, tabs: tabList }));
	}

	renderTab = () => {
		const { tabs, tasks, dispatch } = this.props;
		const activeTab = tabs.find(tab => tab.isActive);
		const activeTasks = activeTab.taskIds.map(taskId => tasks.find(task => task.id === taskId)); // TODO: optimize

		return <Tab 
			tabId={activeTab.id} 
			title={activeTab.title} 
			tasks={activeTasks} 
			dispatch={dispatch} 
			generateId={this.generateId.task} 
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
