import React from 'react';
import { Dispatch } from 'redux';
import { Task as TaskType } from '../store/reducer';
import Task from './Task';
import { Button } from './base-ui';
import { facadeActions } from '../store/actions';

interface TaskListProps {
	dispatch: Dispatch,
	tasks: TaskType[],
	addTask: () => any,
	removeTask: (taskId: number) => any,
}

export default class TaskList extends React.Component<TaskListProps, {}> {

	toggleTask = (id) => () => this.props.dispatch(facadeActions.toggleTask(id));

	updateTaskTitle = (id) => (e) => this.props.dispatch(facadeActions.updateTaskTitle(id, e.target.value));

	render() {
		const { tasks, addTask, removeTask } = this.props;

		return (
			<div>
				{tasks.map(t => 
					<Task
						key={t.id}
						title={t.title}
						done={t.done}
						removeTask={removeTask(t.id)}
						toggleTask={this.toggleTask(t.id)}
						updateTaskTitle={this.updateTaskTitle(t.id)}
					/>
				)}
				<Button text='Add' onClick={addTask} />
			</div>
		)
	}
}
