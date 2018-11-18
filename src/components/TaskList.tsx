import React from 'react';
import Task from './Task';
import { Button } from './base-ui';
import { facadeActions } from '../store/actions';

export default class TaskList extends React.Component<any> {

	toggleTask = (id) => () => this.props.dispatch(facadeActions.toggleTask(id));

	updateTaskTitle = (id) => (e) => {
		const title = e.target.value;
		
		this.props.dispatch(facadeActions.updateTaskTitle(id, title));
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
