import React, { FocusEvent } from 'react';
import { Button, Checkbox, Textarea } from './base-ui';

interface TaskProps {
	title: string,
	done: boolean,
	removeTask: () => any;
	toggleTask: () => any;
	updateTaskTitle: (e: FocusEvent<Element>) => any;
}

interface TaskState {
	title: string,
}

export default class Task extends React.Component<TaskProps, TaskState> {
	state = {
		title: this.props.title,
	}

	onChange = (e: any) => {
		this.setState({ title: e.target.value });
	}

	render() {
		const { done, removeTask, toggleTask, updateTaskTitle } = this.props;
		const { title } = this.state;

		return (
			<div style={{ display: 'flex' }}>
				<Checkbox checked={done} onChange={toggleTask} />
				<Textarea text={title} onChange={e => this.onChange(e)} onBlur={updateTaskTitle} />
				<Button text={'x'} onClick={removeTask} />
			</div>
		)
	}
}
