import { put, select, call, takeEvery, Effect } from 'redux-saga/effects';
import produce from 'immer';

import { systemActions, facadeActionTypes } from '../store/actions';
import { generateId, createNewTask, createNewTab, setRefeshTime, freshTabTitle } from './utils';
import { Task, Tasks, Tab, Tabs, ApplicationState, Views } from '../store/reducer';

// TODO: selectors

type Action<T> = {
  type: string;
  payload: T;
};

function* getNewTabWithTask() {
  const { tabs, tasks } = (yield select()).application;
  const newTaskId = yield call(generateId, Object.keys(tasks));
  const newTask = yield call(createNewTask, newTaskId);
  const newTabId = yield call(generateId, Object.keys(tabs));
  const newTab = yield call(createNewTab, newTabId, newTaskId);
  return { newTaskId, newTask, newTabId, newTab };
}

function* addTab(): Iterator<Effect> {
  const { tabs, tasks, activeView } = (yield select()).application;

  if (activeView === 'notes') {
    const newTabId = yield call(generateId, Object.keys(tabs));
    const newTab = yield call(createNewTab, newTabId, null, 'notes');

    const updatedTabs = produce(tabs, (draftTabs) => {
      draftTabs[newTabId] = newTab;
    });

    yield put(
      systemActions.addNotesTab({
        tabs: updatedTabs,
        activeTab: newTabId,
      })
    );
  } else {
    const { newTaskId, newTask, newTabId, newTab } = yield call(getNewTabWithTask);

    const updatedTabs = produce(tabs, (draftTabs) => {
      draftTabs[newTabId] = newTab;
    });
    const updatedTasks = produce(tasks, (draftTasks) => {
      draftTasks[newTaskId] = newTask;
    });

    yield put(
      systemActions.addTab({
        tasks: updatedTasks,
        tabs: updatedTabs,
        activeTab: newTabId,
      })
    );
  }
}

function* removeTab({ payload: tabId }: Action<string>): Iterator<Effect> {
  const {
    tabs,
    tasks,
    activeTab,
    activeView,
  }: { tabs: Tabs; tasks: Tasks; activeTab: string; activeView: Views } = (yield select()).application;
  const tabsKeys = Object.keys(tabs).filter((key) => tabs[key].kind === activeView);
  const isOnlyTab = tabsKeys.length === 1;

  const changeActiveTab = function*() {
    const currentTabIndex = tabsKeys.indexOf(tabId);
    if (tabsKeys[currentTabIndex + 1] != null) yield put(systemActions.switchTab(tabsKeys[currentTabIndex + 1]));
    else if (tabsKeys[currentTabIndex - 1] != null) yield put(systemActions.switchTab(tabsKeys[currentTabIndex - 1]));
  };

  if (activeView === 'notes') {
    if (isOnlyTab) return;

    if (tabId === activeTab) {
      yield call(changeActiveTab);
    }

    const updatedTabs = produce(tabs, (draftTabs) => {
      delete draftTabs[tabId];
    });

    yield put(systemActions.removeTab({ tasks, tabs: updatedTabs }));
  } else {
    const tasksToRemove = tabs[tabId].contentIds;
    const hasSingleTask = tabs[tabId].contentIds.length === 1;
    const firstEntity = (Object as any).values(yield select((state: any) => state.application[activeView]))[0];

    if (isOnlyTab && hasSingleTask && !firstEntity.title && !firstEntity.done && tabs[tabId].title === freshTabTitle) {
      return;
    }

    if (!isOnlyTab && tabId === activeTab) {
      yield call(changeActiveTab);
    }

    let newTabId;
    let newTab;
    let newTaskId;
    let newTask;

    if (isOnlyTab) ({ newTaskId, newTask, newTabId, newTab } = yield call(getNewTabWithTask));

    const updatedTabs = produce(tabs, (draftTabs) => {
      delete draftTabs[tabId];
      if (newTab) draftTabs[newTabId] = newTab;
    });
    const updatedTasks = produce(tasks, (draftTasks) => {
      tasksToRemove.map((id) => delete draftTasks[id]);
      if (newTask) draftTasks[newTaskId] = newTask;
    });

    yield put(systemActions.removeTab({ tasks: updatedTasks, tabs: updatedTabs }));
    if (newTab) yield put(systemActions.switchTab(newTabId));
  }
}

function* updateTabTitle({ payload: { tabId, title } }: Action<{ tabId: string; title: string }>): Iterator<Effect> {
  const { tabs } = (yield select()).application;

  const updatedTabs = produce(tabs, (draftTabs) => {
    draftTabs[tabId].title = title;
  });

  yield put(systemActions.updateTabTitle(updatedTabs));
}

function* toggleDailyMode({ payload: { tabId } }: Action<{ tabId: string }>): Iterator<Effect> {
  const { tabs, tasks } = (yield select()).application;
  const nextDailyModeState = !tabs[tabId].settings.daily;
  const tasksToUpdate = tabs[tabId].contentIds;

  const updatedTabs = produce(tabs, (draftTabs) => {
    draftTabs[tabId].settings.daily = nextDailyModeState;
  });
  const updatedTasks = produce(tasks, (draftTasks) => {
    tasksToUpdate.map((id) => (draftTasks[id].refreshTime = setRefeshTime(nextDailyModeState)));
  });

  yield put(systemActions.toggleDailyMode({ tasks: updatedTasks, tabs: updatedTabs }));
}

export const tabsSaga = function*() {
  yield takeEvery(facadeActionTypes.ADD_TAB, addTab);
  yield takeEvery(facadeActionTypes.REMOVE_TAB, removeTab);
  yield takeEvery(facadeActionTypes.UPDATE_TAB_TITLE, updateTabTitle);
  yield takeEvery(facadeActionTypes.TOGGLE_DAILY_MODE, toggleDailyMode);
};
