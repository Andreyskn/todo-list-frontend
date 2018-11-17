import { Task } from './reducer'

export const actionTypes = {
	ADD_TASK: '[TASKS] ADD_TASK',
	REMOVE_TASK: '[TASKS] REMOVE_TASK',
	TOGGLE_TASK: '[TASKS] TOGGLE_TASK',
	UPDATE_TASK_TITLE: '[TASKS] UPDATE_TASK_TITLE',
}

export const actions = {
	addTask: (changeSet) => ({ type: actionTypes.ADD_TASK, payload: changeSet }),
	removeTask: (changeSet) => ({ type: actionTypes.REMOVE_TASK, payload: changeSet }),
	toggleTask: (tasks: Task[]) => ({ type: actionTypes.TOGGLE_TASK, payload: { tasks } }),
	updateTaskTitle: (tasks: Task[]) => ({ type: actionTypes.UPDATE_TASK_TITLE, payload: { tasks } }),
}
