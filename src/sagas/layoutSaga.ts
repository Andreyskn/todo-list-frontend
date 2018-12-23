import { put, select, call, takeEvery, Effect } from 'redux-saga/effects';
import produce from 'immer';

import { systemActions, facadeActionTypes } from '../store/actions';
import { Task, Tasks, Tab, Tabs, ApplicationState, Views } from '../store/reducer';

type Action<T> = {
  type: string;
  payload: T;
};

function* changeView({ payload: view }: Action<Views>): Iterator<Effect> {
  const { tabs } = yield select();
  const firstTabId = Object.keys(tabs).find((key) => tabs[key].kind === view);

  yield put(systemActions.changeView({ activeView: view, activeTab: firstTabId }));
}

export const layoutSaga = function*() {
  yield takeEvery(facadeActionTypes.CHANGE_VIEW, changeView);
};
