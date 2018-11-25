import { Tasks, Tabs } from './reducer'

export const systemActionTypes = {
	ADD_TASK: '@@tasks/ADD_TASK',
	REMOVE_TASK: '@@tasks/REMOVE_TASK',
	TOGGLE_TASK: '@@tasks/TOGGLE_TASK',
	UPDATE_TASK_TITLE: '@@tasks/UPDATE_TASK_TITLE',
	SWITCH_TAB: '@@tabs/SWITCH_TAB',
	ADD_TAB: '@@tabs/ADD_TAB',
	REMOVE_TAB: '@@tabs/REMOVE_TAB',
}

export const facadeActionTypes = {
	ADD_TASK: '[FACADE][TASKS] ADD_TASK',
	REMOVE_TASK: '[FACADE][TASKS] REMOVE_TASK',
	TOGGLE_TASK: '[FACADE][TASKS] TOGGLE_TASK',
	UPDATE_TASK_TITLE: '[FACADE][TASKS] UPDATE_TASK_TITLE',
	ADD_TAB: '[FACADE][TABS] ADD_TAB',
	REMOVE_TAB: '[FACADE][TABS] REMOVE_TAB',
}

export const systemActions = {
	addTask: (changeSet: { tasks: Tasks, tabs: Tabs }) => ({ type: systemActionTypes.ADD_TASK, payload: changeSet }),
	removeTask: (changeSet: { tasks: Tasks, tabs: Tabs }) => ({ type: systemActionTypes.REMOVE_TASK, payload: changeSet }),
	toggleTask: (tasks: Tasks) => ({ type: systemActionTypes.TOGGLE_TASK, payload: { tasks } }),
	updateTaskTitle: (tasks: Tasks) => ({ type: systemActionTypes.UPDATE_TASK_TITLE, payload: { tasks } }),
	switchTab: (activeTab: number) => ({ type: systemActionTypes.SWITCH_TAB, payload: { activeTab } }),
	addTab: (changeSet: { tasks: Tasks, tabs: Tabs, activeTab: number }) => ({ type: systemActionTypes.ADD_TAB, payload: changeSet }),
	removeTab: (changeSet: { tasks: Tasks, tabs: Tabs }) => ({ type: systemActionTypes.REMOVE_TAB, payload: changeSet }),
}

export const facadeActions = {
	addTask: (tabId: number) => ({ type: facadeActionTypes.ADD_TASK, payload: tabId }),
	removeTask: (tabId: number, taskId: number) => ({ type: facadeActionTypes.REMOVE_TASK, payload: { tabId, taskId } }),
	toggleTask: (taskId: number) => ({ type: facadeActionTypes.TOGGLE_TASK, payload: taskId }),
	updateTaskTitle: (taskId: number, title: string) => ({type: facadeActionTypes.UPDATE_TASK_TITLE, payload: { taskId, title } }),
	addTab: () => ({ type: facadeActionTypes.ADD_TAB, payload: {} }),
	removeTab: (tabId: number) => ({ type: facadeActionTypes.REMOVE_TAB, payload: tabId }),
}