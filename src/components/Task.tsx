import React, { FocusEvent } from 'react';
import { Button, Checkbox, Input } from './base-ui';
import styled from 'styled-components';

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

const Container = styled.div`
	display: inline-flex;
	align-items: center;
	padding: 10px;

	& + & {
		margin-top: 5px;
	}
`;

const StyledCheckbox = styled(Checkbox)`
	display: flex;
	margin-right: 5px;
`;

const StyledDelButton = styled(Button)`
	margin-left: 5px;
`;

export default class Task extends React.Component<TaskProps, TaskState> {
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
			<Container>
				<StyledCheckbox checked={done} onChange={toggleTask} />
				<Input text={title} onChange={(e) => this.onChange(e)} onBlur={updateTaskTitle} />
				<StyledDelButton text={'×'} onClick={removeTask} />
			</Container>
		);
	}
}
