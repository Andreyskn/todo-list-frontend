import { put, select, call, takeEvery, Effect } from 'redux-saga/effects';
import produce from 'immer';

import { systemActions, facadeActionTypes } from '../store/actions';
import { generateId, createNewTask } from './utils';
import { Task, Tasks, Tab, Tabs, ApplicationState, Views } from '../store/reducer';

// TODO: selectors

type Action<T> = {
  type: string;
  payload: T;
};

function* addTask({ payload: tabId }: Action<string>): Iterator<Effect> {
  const { tabs, tasks } = (yield select()).application;
  const dailyMode = tabs[tabId].daily;
  const newTaskId = yield call(generateId, Object.keys(tasks));
  const newTask = yield call(createNewTask, newTaskId, dailyMode);

  const updatedTasks = produce(tasks, (draftTasks) => {
    draftTasks[newTaskId] = newTask;
  });
  const updatedTabs = produce(tabs, (draftTabs) => {
    draftTabs[tabId].contentIds.push(newTaskId);
  });

  yield put(systemActions.addTask({ tasks: updatedTasks, tabs: updatedTabs }));
}

function* removeTask({
  payload: { tabId, taskId },
}: Action<{ tabId: string; taskId: string }>): Iterator<Effect> | void {
  const { tabs, tasks } = (yield select()).application;
  const hasSingleTask = tabs[tabId].contentIds.length === 1;
  const taskToRemove = tasks[taskId];
  const dailyMode = tabs[tabId].daily;

  if (hasSingleTask && !taskToRemove.title && !taskToRemove.done) return;

  let newTaskId;
  let newTask;
  if (hasSingleTask) {
    newTaskId = yield call(generateId, Object.keys(tasks));
    newTask = yield call(createNewTask, newTaskId, dailyMode);
  }

  const updatedTasks = produce(tasks, (draftTasks) => {
    delete draftTasks[taskId];
    if (newTaskId) draftTasks[newTaskId] = newTask;
  });
  const updatedTabs = produce(tabs, (draftTabs) => {
    draftTabs[tabId].contentIds = tabs[tabId].contentIds.filter((id) => id !== taskId);
    if (newTaskId) draftTabs[tabId].contentIds.push(newTaskId);
  });

  yield put(systemActions.removeTask({ tasks: updatedTasks, tabs: updatedTabs }));
}

function* toggleTask({ payload: taskId }: Action<string>): Iterator<Effect> {
  const { tasks } = (yield select()).application;

  const updatedTasks = produce(tasks, (draftTasks) => {
    draftTasks[taskId].done = !tasks[taskId].done;
  });

  yield put(systemActions.toggleTask(updatedTasks));
}

function* updateTaskTitle({ payload: { taskId, title } }: Action<{ taskId: string; title: string }>): Iterator<Effect> {
  const { tasks } = (yield select()).application;

  const updatedTasks = produce(tasks, (draftTasks) => {
    draftTasks[taskId].title = title;
  });

  yield put(systemActions.updateTaskTitle(updatedTasks));
}

export const tasksSaga = function*() {
  yield takeEvery(facadeActionTypes.ADD_TASK, addTask);
  yield takeEvery(facadeActionTypes.REMOVE_TASK, removeTask);
  yield takeEvery(facadeActionTypes.TOGGLE_TASK, toggleTask);
  yield takeEvery(facadeActionTypes.UPDATE_TASK_TITLE, updateTaskTitle);
};
