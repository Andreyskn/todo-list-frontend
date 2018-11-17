import { put, takeEvery } from 'redux-saga/effects';
import { actionTypes } from './actions';

function addTask() {
	console.log('task added');
}

export function* saga() {
	yield takeEvery(actionTypes.ADD_TASK, addTask);
}