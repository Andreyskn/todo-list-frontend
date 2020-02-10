import { put, select, call, takeEvery, Effect, PutEffect } from 'redux-saga/effects';
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
  const dataToSave = JSON.stringify({ tabs, tasks, notes });

  const { error } = yield call(httpPost, 'http://localhost:3000/api/save', dataToSave);

  if (error) {
    console.warn('Save request to server has failed:', error.timeout ? 'Timeout' : error);

    try {
      localStorage.setItem('todo-list-state', dataToSave);
      console.log('Successfully saved data to localStorage');
    } catch (err) {
      console.error('Save request to localStorage has failed:', err);
      yield put(systemActions.setRequestStatus('fail'));
      return;
    }
  }

  yield put(systemActions.setRequestStatus('success'));
}

export const apiSaga = function*() {
  yield takeEvery(facadeActionTypes.SAVE_REQUEST, saveRequest);
};
