import { put, select, call, takeEvery, Effect } from 'redux-saga/effects';
import { systemActions, facadeActionTypes } from './actions';
import { Task, Tasks, Tab, Tabs } from './reducer';
import produce from 'immer';

type Action<T> = {
	type: string,
	payload: T,
};

const generateId = (ids: number[]): number => Math.max(...ids) + 1;
const createEmptyTask = (id: number): Task => ({ id, title: '', done: false });

function* addTask({ payload: tabId }: Action<number>): Iterator<Effect> {
	const { tabs, tasks } = yield select();
	const newTaskId = yield call(generateId, tasks.allIds);
	const newTask = yield call(createEmptyTask, newTaskId);

	const updatedTasks = produce(tasks, draftTasks => {
		draftTasks.byId[newTaskId] = newTask;
		draftTasks.allIds.push(newTaskId);
	});
	const updatedTabs = produce(tabs, draftTabs => {
		draftTabs.byId[tabId].taskIds.push(newTaskId);
	});

	yield put(systemActions.addTask({ tasks: updatedTasks, tabs: updatedTabs }));
}

function* removeTask({ payload: { tabId, taskId } }: Action<{ tabId: number, taskId: number }>): Iterator<Effect> | void {
	const { tabs, tasks } = yield select();
	const hasSingleTask = tabs.byId[tabId].taskIds.length === 1;
	const taskToRemove = tasks.byId[taskId];

	if (hasSingleTask && !taskToRemove.title && !taskToRemove.done) return;

	let newTaskId, newTask;
	if (hasSingleTask) {
		newTaskId = yield call(generateId, tasks.allIds);
		newTask = yield call(createEmptyTask, newTaskId);
	}

	const updatedTasks = produce(tasks, draftTasks => {
		delete draftTasks.byId[taskId];
		draftTasks.allIds = tasks.allIds.filter(id => id !== taskId);
		if (newTaskId) {
			draftTasks.byId[newTaskId] = newTask;
			draftTasks.allIds.push(newTaskId);
		}
	});

	const updatedTabs = produce(tabs, draftTabs => {
		draftTabs.byId[tabId].taskIds = tabs.byId[tabId].taskIds.filter(id => id !== taskId);
		if (newTaskId) draftTabs.byId[tabId].taskIds.push(newTaskId);
	});

	yield put(systemActions.removeTask({ tasks: updatedTasks, tabs: updatedTabs }));
}

function* toggleTask({ payload: taskId }: Action<number>): Iterator<Effect> {
	const { tasks } = yield select();
	const updatedTasks = produce(tasks, draftTasks => {
		draftTasks.byId[taskId].done = !tasks.byId[taskId].done;
	});

	yield put(systemActions.toggleTask(updatedTasks));
}

function* updateTaskTitle({ payload: { taskId, title } }: Action<{ taskId: number, title: string }>): Iterator<Effect> {
	const { tasks } = yield select();
	const updatedTasks = produce(tasks, draftTasks => {
		draftTasks.byId[taskId].title = title;
	});

	yield put(systemActions.updateTaskTitle(updatedTasks));
}

export function* saga() {
	yield takeEvery(facadeActionTypes.ADD_TASK, addTask);
	yield takeEvery(facadeActionTypes.REMOVE_TASK, removeTask);
	yield takeEvery(facadeActionTypes.TOGGLE_TASK, toggleTask);
	yield takeEvery(facadeActionTypes.UPDATE_TASK_TITLE, updateTaskTitle);
}