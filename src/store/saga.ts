import { put, select, call, takeEvery } from 'redux-saga/effects';
import { reducerActions, facadeActionTypes } from './actions';

const generateId = (items) => Math.max(...items.map(item => item.id)) + 1;
const createEmptyTask = (id) => ({ id, title: '', done: false });

function* addTask({ payload: tabId }: any) {
	const { tabs, tasks } = yield select();
	const newTaskId = yield call(generateId, tasks);
	const taskList = [...tasks, yield call(createEmptyTask, newTaskId)];
	const tabList = tabs.map(tab => tab.id === tabId ? { ...tab, taskIds: [...tab.taskIds, newTaskId] } : tab);

	yield put(reducerActions.addTask({ tasks: taskList, tabs: tabList }));
}

function* removeTask({ payload: { tabId, taskId } }: any) {
	const { tabs, tasks } = yield select();
	const activeTab = tabs.find(tab => tab.id === tabId);
	const hasSingleTask = activeTab.taskIds.length === 1;
	const taskToRemove = tasks.find(task => task.id === taskId);

	if (hasSingleTask && !taskToRemove.title && !taskToRemove.done) return;

	const taskList = tasks.filter(task => task.id !== taskId);

	let newTaskId;
	if (hasSingleTask) {
		newTaskId = yield call(generateId, tasks);
		taskList.push(yield call(createEmptyTask, newTaskId));
	}

	const updateTaskIds = (taskIds) => {
		const filtered = taskIds.filter(tId => tId !== taskId);
		return newTaskId ? [...filtered, newTaskId] : filtered;
	}
	const tabList = tabs.map(tab => tab.id === tabId ? { ...tab, taskIds: updateTaskIds(tab.taskIds) } : tab);

	yield put(reducerActions.removeTask({ tasks: taskList, tabs: tabList }));
}

function* toggleTask({ payload: taskId }: any) {
	const { tasks } = yield select();
	const taskList = tasks.map(task => task.id === taskId ? { ...task, done: !task.done } : task);

	yield put(reducerActions.toggleTask(taskList));
}

function* updateTaskTitle({ payload: { taskId, title } }: any) {
	const { tasks } = yield select();
	const taskList = tasks.map(task => task.id === taskId ? { ...task, title } : task);

	yield put(reducerActions.updateTaskTitle(taskList));
}

export function* saga() {
	yield takeEvery(facadeActionTypes.ADD_TASK, addTask);
	yield takeEvery(facadeActionTypes.REMOVE_TASK, removeTask);
	yield takeEvery(facadeActionTypes.TOGGLE_TASK, toggleTask);
	yield takeEvery(facadeActionTypes.UPDATE_TASK_TITLE, updateTaskTitle);
}