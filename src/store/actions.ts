import { Task } from './reducer'

export const actionTypes = {
	tasks: {
		ADD_TASK: '[TASKS] ADD_TASK',
		REMOVE_TASK: '[TASKS] REMOVE_TASK',
		TOGGLE_TASK: '[TASKS] TOGGLE_TASK',
		UPDATE_TASK_TITLE: '[TASKS] UPDATE_TASK_TITLE'
	},
}

export const actions = {
	tasks: {
		addTask: (tasks: Task[]) => ({ type: actionTypes.tasks.ADD_TASK, payload: { tasks } }),
		removeTask: (tasks: Task[]) => ({ type: actionTypes.tasks.REMOVE_TASK, payload: { tasks } }),
		toggleTask: (tasks: Task[]) => ({ type: actionTypes.tasks.TOGGLE_TASK, payload: { tasks } }),
		updateTaskTitle: (tasks: Task[]) => ({ type: actionTypes.tasks.UPDATE_TASK_TITLE, payload: { tasks } }),
	},
}
