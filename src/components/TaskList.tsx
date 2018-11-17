import React from 'react';
import Task from './Task';
import { Button } from './base-ui';
import { actions } from '../store/actions';

export default class TaskList extends React.Component<any> {

	toggleTask = (id) => () => {
		const { tasks, dispatch } = this.props;
		const taskList = tasks.map(task => task.id === id ? { ...task, done: !task.done } : task);

		dispatch(actions.toggleTask(taskList));
	}

	updateTaskTitle = (id) => (e) => {
		const { tasks, dispatch } = this.props;
		const title = e.target.value;
		const taskList = tasks.map(task => task.id === id ? { ...task, title } : task); // bug

		dispatch(actions.updateTaskTitle(taskList));
	}

	render() {
		const { tasks, addTask, removeTask } = this.props;

		return (
			<div>
				{tasks.map(t => <Task key={t.id} title={t.title} done={t.done} removeTask={removeTask(t.id)} toggleTask={this.toggleTask(t.id)} updateTaskTitle={this.updateTaskTitle(t.id)} />)}
				<Button text='Add' onClick={addTask} />
			</div>
		)
	}
}
