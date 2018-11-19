import { Task } from './reducer'

export const systemActionTypes = {
	ADD_TASK: '[TASKS] ADD_TASK',
	REMOVE_TASK: '[TASKS] REMOVE_TASK',
	TOGGLE_TASK: '[TASKS] TOGGLE_TASK',
	UPDATE_TASK_TITLE: '[TASKS] UPDATE_TASK_TITLE',
}

export const facadeActionTypes = {
	ADD_TASK: '[FACADE][TASKS] ADD_TASK',
	REMOVE_TASK: '[FACADE][TASKS] REMOVE_TASK',
	TOGGLE_TASK: '[FACADE][TASKS] TOGGLE_TASK',
	UPDATE_TASK_TITLE: '[FACADE][TASKS] UPDATE_TASK_TITLE',
}

export const systemActions = {
	addTask: (changeSet) => ({ type: systemActionTypes.ADD_TASK, payload: changeSet }),
	removeTask: (changeSet) => ({ type: systemActionTypes.REMOVE_TASK, payload: changeSet }),
	toggleTask: (tasks: Task[]) => ({ type: systemActionTypes.TOGGLE_TASK, payload: { tasks } }),
	updateTaskTitle: (tasks: Task[]) => ({ type: systemActionTypes.UPDATE_TASK_TITLE, payload: { tasks } }),
}

export const facadeActions = {
	addTask: (tabId: number) => ({ type: facadeActionTypes.ADD_TASK, payload: tabId }),
	removeTask: (tabId: number, taskId: number) => ({ type: facadeActionTypes.REMOVE_TASK, payload: { tabId, taskId } }),
	toggleTask: (taskId: number) => ({ type: facadeActionTypes.TOGGLE_TASK, payload: taskId }),
	updateTaskTitle: (taskId: number, title: string) => ({type: facadeActionTypes.UPDATE_TASK_TITLE, payload: { taskId, title } }),
}