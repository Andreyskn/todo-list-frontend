import { put, select, call, takeEvery, Effect } from 'redux-saga/effects';
import produce from 'immer';

import { systemActions, facadeActionTypes } from '../store/actions';
import { Task, Tasks, Tab, Tabs, ApplicationState, Views, RequestStatus } from '../store/reducer';
import { httpPost } from '../httpClient';

type Action<T> = {
  type: string;
  payload: T;
};

function* saveRequest(): Iterator<Effect> {
  yield put(systemActions.setRequestStatus('pending'));

  const { tabs, tasks, notes } = (yield select()).application;
  const dataToSave = { tabs, tasks, notes };

  const { error } = yield call(httpPost, '/api/save', dataToSave);

  if (error) {
    console.error('Save request failed:', error.timeout ? 'Timeout' : error);
    yield put(systemActions.setRequestStatus('fail'));
    return;
  }

  yield put(systemActions.setRequestStatus('success'));
}

export const apiSaga = function*() {
  yield takeEvery(facadeActionTypes.SAVE_REQUEST, saveRequest);
};
