import React from 'react';
import TaskList from './TaskList';

export default class Tab extends React.Component {
	render() {
		const { tasks, dispatch } = this.props;

		return (
			<div>
				<TaskList tasks={tasks} dispatch={dispatch} />
			</div>
		)
	}
}
