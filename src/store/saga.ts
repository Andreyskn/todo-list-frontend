import { put, select, call, takeEvery, Effect } from 'redux-saga/effects';
import { systemActions, facadeActionTypes } from './actions';
import { Task, Tasks, Tab, Tabs, ApplicationState } from './reducer';
import produce from 'immer';

// TODO: selectors

type Action<T> = {
	type: string,
	payload: T,
};

const freshTabTitle = 'New tab';

const generateId = (ids: string[]): string => `${Math.max(...ids.map(id => parseInt(id, 10))) + 1}`;

const createNewTask = (id: string): Task => ({ id, title: '', done: false });

const createNewTab = (id: string, taskId: string): Tab => ({ id, title: freshTabTitle, taskIds: [taskId] });

function* getNewTabWithTask() {
	const { tabs, tasks } = yield select(),
		newTaskId = yield call(generateId, Object.keys(tasks)),
		newTask = yield call(createNewTask, newTaskId),
		newTabId = yield call(generateId, Object.keys(tabs)),
		newTab = yield call(createNewTab, newTabId, newTaskId);
	return { newTaskId, newTask, newTabId, newTab }
}

function* addTask({ payload: tabId }: Action<string>): Iterator<Effect> {
	const { tabs, tasks } = yield select();
	const newTaskId = yield call(generateId, Object.keys(tasks));
	const newTask = yield call(createNewTask, newTaskId);

	const updatedTasks = produce(tasks, draftTasks => {
		draftTasks[newTaskId] = newTask;
	});
	const updatedTabs = produce(tabs, draftTabs => {
		draftTabs[tabId].taskIds.push(newTaskId);
	});

	yield put(systemActions.addTask({ tasks: updatedTasks, tabs: updatedTabs }));
}

function* removeTask({ payload: { tabId, taskId } }: Action<{ tabId: string, taskId: string }>): Iterator<Effect> | void {
	const { tabs, tasks } = yield select();
	const hasSingleTask = tabs[tabId].taskIds.length === 1;
	const taskToRemove = tasks[taskId];

	if (hasSingleTask && !taskToRemove.title && !taskToRemove.done) return;

	let newTaskId, newTask;
	if (hasSingleTask) {
		newTaskId = yield call(generateId, Object.keys(tasks));
		newTask = yield call(createNewTask, newTaskId);
	}

	const updatedTasks = produce(tasks, draftTasks => {
		delete draftTasks[taskId];
		if (newTaskId) draftTasks[newTaskId] = newTask;
	});
	const updatedTabs = produce(tabs, draftTabs => {
		draftTabs[tabId].taskIds = tabs[tabId].taskIds.filter(id => id !== taskId);
		if (newTaskId) draftTabs[tabId].taskIds.push(newTaskId);
	});

	yield put(systemActions.removeTask({ tasks: updatedTasks, tabs: updatedTabs }));
}

function* toggleTask({ payload: taskId }: Action<string>): Iterator<Effect> {
	const { tasks } = yield select();

	const updatedTasks = produce(tasks, draftTasks => {
		draftTasks[taskId].done = !tasks[taskId].done;
	});

	yield put(systemActions.toggleTask(updatedTasks));
}

function* updateTaskTitle({ payload: { taskId, title } }: Action<{ taskId: string, title: string }>): Iterator<Effect> {
	const { tasks } = yield select();

	const updatedTasks = produce(tasks, draftTasks => {
		draftTasks[taskId].title = title;
	});

	yield put(systemActions.updateTaskTitle(updatedTasks));
}

function* addTab(): Iterator<Effect> {
	const { tabs, tasks } = yield select();
	const { newTaskId, newTask, newTabId, newTab } = yield call(getNewTabWithTask);

	const updatedTabs = produce(tabs, draftTabs => {
		draftTabs[newTabId] = newTab;
	});
	const updatedTasks = produce(tasks, draftTasks => {
		draftTasks[newTaskId] = newTask;
	});

	yield put(systemActions.addTab({ tasks: updatedTasks, tabs: updatedTabs, activeTab: newTabId }));
}

function* removeTab({ payload: tabId }: Action<string>): Iterator<Effect> {
	const { tabs, tasks, activeTab }: { tabs: Tabs, tasks: Tasks, activeTab: string } = yield select();
	const tasksToRemove = tabs[tabId].taskIds;
	const tabsKeys = Object.keys(tabs);
	const isOnlyTab = tabsKeys.length === 1;
	const hasSingleTask = tabs[tabId].taskIds.length === 1;
	const firstTask = (Object as any).values(tasks)[0];

	if (isOnlyTab && hasSingleTask && !firstTask.title && !firstTask.done && tabs[tabId].title === freshTabTitle) return;

	if (!isOnlyTab && tabId === activeTab) {
		const currentTabIndex = tabsKeys.indexOf(tabId);
		if (tabsKeys[currentTabIndex + 1] != null) yield put(systemActions.switchTab(tabsKeys[currentTabIndex + 1]));
		else if (tabsKeys[currentTabIndex - 1] != null) yield put(systemActions.switchTab(tabsKeys[currentTabIndex - 1]));
	}

	let newTabId, newTab, newTaskId, newTask;
	if (isOnlyTab) ({ newTaskId, newTask, newTabId, newTab } = yield call(getNewTabWithTask));

	const updatedTabs = produce(tabs, draftTabs => {
		delete draftTabs[tabId];
		if (newTab) draftTabs[newTabId] = newTab;
	});
	const updatedTasks = produce(tasks, draftTasks => {
		tasksToRemove.map(id => delete draftTasks[id]);
		if (newTask) draftTasks[newTaskId] = newTask;
	});

	yield put(systemActions.removeTab({ tasks: updatedTasks, tabs: updatedTabs }));
	if (newTab) yield put(systemActions.switchTab(newTabId));
}

function* updateTabTitle({ payload: { tabId, title } }: Action<{ tabId: string, title: string }>): Iterator<Effect> {
	const { tabs } = yield select();
	
	const updatedTabs = produce(tabs, draftTabs => {
		draftTabs[tabId].title = title;
	});

	yield put(systemActions.updateTabTitle(updatedTabs));
}

export function* saga() {
	yield takeEvery(facadeActionTypes.ADD_TASK, addTask);
	yield takeEvery(facadeActionTypes.REMOVE_TASK, removeTask);
	yield takeEvery(facadeActionTypes.TOGGLE_TASK, toggleTask);
	yield takeEvery(facadeActionTypes.UPDATE_TASK_TITLE, updateTaskTitle);
	yield takeEvery(facadeActionTypes.ADD_TAB, addTab);
	yield takeEvery(facadeActionTypes.REMOVE_TAB, removeTab);
	yield takeEvery(facadeActionTypes.UPDATE_TAB_TITLE, updateTabTitle);
}