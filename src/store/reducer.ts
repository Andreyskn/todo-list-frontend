import { systemActionTypes } from './actions';
import { Reducer } from 'redux';

export type Task = {
	id: number,
	title: string,
	done: boolean,
}

export type Tasks = {
	byId: { [key: number]: Task },
	allIds: number[],
}

export type Tab = {
	id: number,
	title: string,
	taskIds: number[],
}

export type Tabs = {
	byId: { [key: number]: Tab },
	allIds: number[],
}

export type ApplicationState = {
	activeTab: number,
	tabs: Tabs,
	tasks: Tasks,
};

const initialState: ApplicationState = {
	activeTab: 0,
	tabs: {
		byId: {
			0: {
				id: 0,
				title: 'Tab 1',
				taskIds: [0],
			},
			1: {
				id: 1,
				title: 'Tab 2',
				taskIds: [1],
			},
			2: {
				id: 2,
				title: 'Tab 3',
				taskIds: [2],
			}
		},
		allIds: [0, 1, 2],
	},
	tasks: {
		byId: {
			0: {
				id: 0,
				title: 'Task from first tab',
				done: false,
			},
			1: {
				id: 1,
				title: 'Task from second tab',
				done: false,
			},
			2: {
				id: 2,
				title: 'Task from third tab',
				done: false,
			}
		},
		allIds: [0, 1, 2],
	}
}

export const reducer: Reducer<ApplicationState> = (state = initialState, { type, payload }) => {
	switch (type) {
		case systemActionTypes.ADD_TASK:
		case systemActionTypes.REMOVE_TASK:
		case systemActionTypes.TOGGLE_TASK:
		case systemActionTypes.UPDATE_TASK_TITLE:
		case systemActionTypes.SWITCH_TAB:
		case systemActionTypes.ADD_TAB:
		case systemActionTypes.REMOVE_TAB:
			return { ...state, ...payload };

		default:
			return state;
	}
}