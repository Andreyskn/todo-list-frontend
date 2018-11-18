import { reducerActionTypes } from './actions';

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
		case reducerActionTypes.ADD_TASK:
		case reducerActionTypes.REMOVE_TASK:
		case reducerActionTypes.TOGGLE_TASK:
		case reducerActionTypes.UPDATE_TASK_TITLE:
			return { ...state, ...payload };

		default:
			return state;
	}
}