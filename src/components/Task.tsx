import React from 'react';
import { Button, Checkbox, Textarea } from './base-ui';

export default class Task extends React.Component<any, any> {
	state = {
		title: this.props.title,
	}

	onChange = (e) => {
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
