import React from 'react';
import Task from './Task';
import { Button } from './base-ui';
import { actions } from '../store/actions';
import { emptyTask } from '../utils';

export default class TaskList extends React.Component<any> {

	getLastId = () => Math.max(...this.props.tasks.map(t => t.id));

	lastId = this.getLastId();

	componentDidUpdate() {
		this.lastId = this.getLastId();
	}

	addTask = () => {
		const { tasks, dispatch } = this.props;
		const taskList = [...tasks, emptyTask(++this.lastId)];

		dispatch(actions.tasks.addTask(taskList));
	}

	removeTask = (id) => () => {
		const { tasks, dispatch } = this.props;
		if (tasks.length === 1 && !tasks[0].title && !tasks[0].done) return;

		const taskList = tasks.filter(task => task.id !== id);
		if (!taskList.length) taskList.push(emptyTask(++this.lastId));

		dispatch(actions.tasks.removeTask(taskList));
	}

	toggleTask = (id) => () => {
		const { tasks, dispatch } = this.props;
		const taskList = tasks.map(task => task.id === id ? { ...task, done: !task.done } : task);

		dispatch(actions.tasks.toggleTask(taskList));
	}

	updateTaskTitle = (id) => (e) => {
		const { tasks, dispatch } = this.props;
		const title = e.target.value;
		const taskList = tasks.map(task => task.id === id ? { ...task, title } : task);

		dispatch(actions.tasks.updateTaskTitle(taskList));
	}

	render() {
		const { tasks } = this.props;

		return (
			<div>
				{tasks.map(t => <Task key={t.id} title={t.title} done={t.done} removeTask={this.removeTask(t.id)} toggleTask={this.toggleTask(t.id)} updateTaskTitle={this.updateTaskTitle(t.id)} />)}
				<Button text='Add' onClick={this.addTask} />
			</div>
		)
	}
}
