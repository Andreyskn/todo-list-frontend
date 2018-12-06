import React from 'react';
import { Dispatch } from 'redux';
import { Task as TaskType } from '../store/reducer';
import Task from './Task';
import { Button } from './base-ui';
import { facadeActions } from '../store/actions';
import styled from 'styled-components';

interface TaskListProps {
	dispatch: Dispatch;
	tasks: TaskType[];
	addTask: () => any;
	removeTask: (taskId: string) => any;
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
`;

const StyledAddButton = styled(Button)`
	position: absolute;
	top: 0;
	left: calc(100% + 15px);
`;

export default class TaskList extends React.Component<TaskListProps, {}> {
	toggleTask = (id) => () => this.props.dispatch(facadeActions.toggleTask(id));

	updateTaskTitle = (id) => (e) => this.props.dispatch(facadeActions.updateTaskTitle(id, e.target.value));

	render() {
		const { tasks, addTask, removeTask } = this.props;

		return (
			<Container>
				{tasks.map((t) => (
					<Task
						key={t.id}
						title={t.title}
						done={t.done}
						removeTask={removeTask(t.id)}
						toggleTask={this.toggleTask(t.id)}
						updateTaskTitle={this.updateTaskTitle(t.id)}
					/>
				))}
				<StyledAddButton text='Add Task' onClick={addTask} />
			</Container>
		);
	}
}
