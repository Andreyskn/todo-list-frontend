import React, { FocusEvent } from 'react';

import { Wrapper } from './styled';
import { Button, Checkbox, Input } from '../base-ui';

interface TaskProps {
	title: string;
	done: boolean;
	removeTask: () => any;
	toggleTask: () => any;
	updateTaskTitle: (e: FocusEvent<Element>) => any;
}

interface TaskState {
	title: string;
}

export class Task extends React.Component<TaskProps, TaskState> {
	state = {
		title: this.props.title,
	};

	onChange = (e: any) => {
		this.setState({ title: e.target.value });
	};

	render() {
		const { done, removeTask, toggleTask, updateTaskTitle } = this.props;
		const { title } = this.state;

		return (
			<Wrapper>
				<Checkbox checked={done} onChange={toggleTask} />
				<Input text={title} onChange={(e) => this.onChange(e)} onBlur={updateTaskTitle} />
				<Button text={'×'} onClick={removeTask} styleMode={'spaced'} />
			</Wrapper>
		);
	}
}
