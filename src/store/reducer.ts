import { actionTypes } from './actions';

export type Task = {
	id: number,
	title: string,
	done: boolean,
}

export type Tab = {
	id: number,
	title: string,
	isActive: boolean,
	taskIds: number[],
}

export type ApplicationState = {
	tabs: Tab[],
	tasks: Task[],
};

const initialState: ApplicationState = {
	tabs: [{ id: 0, title: 'Tab', isActive: true, taskIds: [0] }],
	tasks: [
		{ id: 0, title: '', done: false },
		{ id: 1, title: '', done: false },
	]
}

export default function (state = initialState, { type, payload }) {
	switch (type) {
		case actionTypes.ADD_TASK:
		case actionTypes.REMOVE_TASK:
		case actionTypes.TOGGLE_TASK:
		case actionTypes.UPDATE_TASK_TITLE:
			return { ...state, ...payload };

		default:
			return state;
	}
}