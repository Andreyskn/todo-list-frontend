import { actionTypes } from './actions';

export type Task = {
	id: number,
	title: string,
	done: boolean,
}

export type Tab = {
	id: number,
	title: string,
	active: boolean,
	tasks: number[],
}

export type ApplicationState = {
	tabs: Tab[],
	tasks: Task[],
};

const initialState: ApplicationState = {
	tabs: [{ id: 0, title: 'Tab', active: true, tasks: [0] }],
	tasks: [{ id: 0, title: '', done: false }]
}

export default function (state = initialState, { type, payload }) {
	switch (type) {
		case actionTypes.tasks.ADD_TASK:
		case actionTypes.tasks.REMOVE_TASK:
		case actionTypes.tasks.TOGGLE_TASK:
		case actionTypes.tasks.UPDATE_TASK_TITLE:
			return { ...state, ...payload };

		default:
			return state;
	}
}