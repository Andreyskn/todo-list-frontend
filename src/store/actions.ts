import { Task } from './reducer'

export const reducerActionTypes = {
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

export const reducerActions = {
	addTask: (changeSet) => ({ type: reducerActionTypes.ADD_TASK, payload: changeSet }),
	removeTask: (changeSet) => ({ type: reducerActionTypes.REMOVE_TASK, payload: changeSet }),
	toggleTask: (tasks: Task[]) => ({ type: reducerActionTypes.TOGGLE_TASK, payload: { tasks } }),
	updateTaskTitle: (tasks: Task[]) => ({ type: reducerActionTypes.UPDATE_TASK_TITLE, payload: { tasks } }),
}

export const facadeActions = {
	addTask: (changeSet) => ({ type: facadeActionTypes.ADD_TASK, payload: changeSet }),
	removeTask: (tabId: number, taskId: number) => ({ type: facadeActionTypes.REMOVE_TASK, payload: { tabId, taskId } }),
	toggleTask: (taskId: number) => ({ type: facadeActionTypes.TOGGLE_TASK, payload: taskId }),
	updateTaskTitle: (taskId: number, title: string) => ({
		type: facadeActionTypes.UPDATE_TASK_TITLE, payload: { taskId, title } }),
}