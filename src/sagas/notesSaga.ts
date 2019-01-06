import { put, select, call, takeEvery, Effect } from 'redux-saga/effects';
import produce from 'immer';

import { systemActions, facadeActionTypes } from '../store/actions';
import { generateId, createNewTask, createNewNote, createNewTab, setRefeshTime, freshTabTitle } from './utils';
import { Task, Tasks, Tab, Tabs, ApplicationState, Views } from '../store/reducer';

type Action<T> = {
  type: string;
  payload: T;
};

function* addNote({ payload: tabId }: Action<string>): Iterator<Effect> {
  const { tabs, notes } = (yield select()).application;
  const newNoteId = yield call(generateId, Object.keys(notes));
  const newNote = yield call(createNewNote, newNoteId);

  const updatedNotes = produce(notes, (draftNotes) => {
    draftNotes[newNoteId] = newNote;
  });
  const updatedTabs = produce(tabs, (draftTabs) => {
    draftTabs[tabId].contentIds.push(newNoteId);
  });

  yield put(systemActions.addNote({ notes: updatedNotes, tabs: updatedTabs }));
}

function* removeNote({ payload: { tabId, noteId } }: Action<{ tabId: string; noteId: string }>): Iterator<Effect> {
  const { tabs, notes } = (yield select()).application;

  const updatedNotes = produce(notes, (draftNotes) => {
    delete draftNotes[noteId];
  });
  const updatedTabs = produce(tabs, (draftTabs) => {
    draftTabs[tabId].contentIds = tabs[tabId].contentIds.filter((id) => id !== noteId);
  });

  yield put(systemActions.removeNote({ notes: updatedNotes, tabs: updatedTabs }));
}

function* updateNote({
  payload: { noteId, title, text },
}: Action<{ noteId: string; title: string; text: string }>): Iterator<Effect> {
  const { notes } = (yield select()).application;

  const updatedNotes = produce(notes, (draftNotes) => {
    draftNotes[noteId].title = title;
    draftNotes[noteId].text = text;
  });

  yield put(systemActions.updateNote(updatedNotes));
}

export const notesSaga = function*() {
  yield takeEvery(facadeActionTypes.ADD_NOTE, addNote);
  yield takeEvery(facadeActionTypes.REMOVE_NOTE, removeNote);
  yield takeEvery(facadeActionTypes.UPDATE_NOTE, updateNote);
};
