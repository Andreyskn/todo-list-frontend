import { put, select, call, takeEvery, Effect } from 'redux-saga/effects';
import { systemActions, facadeActionTypes } from './actions';
import { Task, Tasks, Tab, Tabs, ApplicationState } from './reducer';
import produce from 'immer';

type Action<T> = {
	type: string,
	payload: T,
};

const generateId = (ids: number[]): number => Math.max(...ids) + 1;
const createNewTask = (id: number): Task => ({ id, title: '', done: false });
const createNewTab = (id: number, taskId: number): Tab => ({ id, title: 'New tab', taskIds: [taskId] });

function* addTask({ payload: tabId }: Action<number>): Iterator<Effect> {
	const { tabs, tasks } = yield select();
	const newTaskId = yield call(generateId, tasks.allIds);
	const newTask = yield call(createNewTask, newTaskId);

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
		newTask = yield call(createNewTask, newTaskId);
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

function* addTab(): Iterator<Effect> {
	const { tabs, tasks } = yield select();
	const newTaskId = yield call(generateId, tasks.allIds);
	const newTask = yield call(createNewTask, newTaskId);
	const newTabId = yield call(generateId, tabs.allIds);
	const newTab = yield call(createNewTab, newTabId, newTaskId);

	const updatedTabs = produce(tabs, draftTabs => {
		draftTabs.byId[newTabId] = newTab;
		draftTabs.allIds.push(newTabId);
	});

	const updatedTasks = produce(tasks, draftTasks => {
		draftTasks.byId[newTaskId] = newTask;
		draftTasks.allIds.push(newTaskId);
	});

	yield put(systemActions.addTab({ tasks: updatedTasks, tabs: updatedTabs, activeTab: newTabId }));
}

function* removeTab({ payload: tabId }: Action<number>): Iterator<Effect> {
	const { tabs, tasks, activeTab } = yield select();
	const tasksToRemove = tabs.byId[tabId].taskIds;
	const hasSingleTab = tabs.allIds.length === 1;

	// TODO: return on attempt to delete sole unmodified tab 

	if (!hasSingleTab && tabId === activeTab) {
		const currentTabIndex = tabs.allIds.indexOf(tabId);
		if (tabs.allIds[currentTabIndex + 1]) yield put(systemActions.switchTab(tabs.allIds[currentTabIndex + 1]));
		else if (tabs.allIds[currentTabIndex - 1]) yield put(systemActions.switchTab(tabs.allIds[currentTabIndex - 1]));
	}

	let newTabId, newTab, newTaskId, newTask;
	if (hasSingleTab) {
		newTaskId = yield call(generateId, tasks.allIds);
		newTask = yield call(createNewTask, newTaskId);
		newTabId = yield call(generateId, tabs.allIds);
		newTab = yield call(createNewTab, newTabId, newTaskId);
	}

	const updatedTabs = produce(tabs, draftTabs => {
		delete draftTabs.byId[tabId];
		draftTabs.allIds = tabs.allIds.filter(id => id !== tabId);
		if (newTab) {
			draftTabs.byId[newTabId] = newTab;
			draftTabs.allIds.push(newTabId);
		}
	});

	const updatedTasks = produce(tasks, draftTasks => {
		tasksToRemove.map(id => delete draftTasks.byId[id]);
		draftTasks.allIds = tasks.allIds.filter(id => !tasksToRemove.includes(id));
		if (newTask) {
			draftTasks.byId[newTaskId] = newTask;
			draftTasks.allIds.push(newTaskId);
		}
	});

	yield put(systemActions.removeTab({ tasks: updatedTasks, tabs: updatedTabs }));
	if (newTab) yield put(systemActions.switchTab(newTabId));
}

export function* saga() {
	yield takeEvery(facadeActionTypes.ADD_TASK, addTask);
	yield takeEvery(facadeActionTypes.REMOVE_TASK, removeTask);
	yield takeEvery(facadeActionTypes.TOGGLE_TASK, toggleTask);
	yield takeEvery(facadeActionTypes.UPDATE_TASK_TITLE, updateTaskTitle);
	yield takeEvery(facadeActionTypes.ADD_TAB, addTab);
	yield takeEvery(facadeActionTypes.REMOVE_TAB, removeTab);
}