import { Tasks, Tabs, Notes, ApplicationState, Views } from './reducer';

export const systemActionTypes = {
  INIT: '🔥 INIT',
  ADD_TASK: '🚀 ADD_TASK',
  REMOVE_TASK: '🚀 REMOVE_TASK',
  TOGGLE_TASK: '🚀 TOGGLE_TASK',
  UPDATE_TASK_TITLE: '🚀 UPDATE_TASK_TITLE',
  SWITCH_TAB: '🚀 SWITCH_TAB',
  ADD_TAB: '🚀 ADD_TAB',
  ADD_NOTES_TAB: '🚀 ADD_NOTES_TAB',
  REMOVE_TAB: '🚀 REMOVE_TAB',
  UPDATE_TAB_TITLE: '🚀 UPDATE_TAB_TITLE',
  TOGGLE_DAILY_MODE: '🚀 TOGGLE_DAILY_MODE',
  CHANGE_VIEW: '🚀 CHANGE_VIEW',
  OPEN_NOTE_EDITOR: '🚀 OPEN_NOTE_EDITOR',
  UPDATE_NOTE: '🚀 UPDATE_NOTE',
  ADD_NOTE: '🚀 ADD_NOTE',
  REMOVE_NOTE: '🚀 REMOVE_NOTE',
};

export const facadeActionTypes = {
  ADD_TASK: '🏠 ADD_TASK',
  REMOVE_TASK: '🏠 REMOVE_TASK',
  TOGGLE_TASK: '🏠 TOGGLE_TASK',
  UPDATE_TASK_TITLE: '🏠 UPDATE_TASK_TITLE',
  ADD_TAB: '🏠 ADD_TAB',
  REMOVE_TAB: '🏠 REMOVE_TAB',
  UPDATE_TAB_TITLE: '🏠 UPDATE_TAB_TITLE',
  TOGGLE_DAILY_MODE: '🏠 TOGGLE_DAILY_MODE',
  CHANGE_VIEW: '🏠 CHANGE_VIEW',
  UPDATE_NOTE: '🏠 UPDATE_NOTE',
  ADD_NOTE: '🏠 ADD_NOTE',
  REMOVE_NOTE: '🏠 REMOVE_NOTE',
};

export const systemActions = {
  init: (data: ApplicationState) => ({ type: systemActionTypes.INIT, payload: data }),
  addTask: (changeSet: { tasks: Tasks; tabs: Tabs }) => ({
    type: systemActionTypes.ADD_TASK,
    payload: changeSet,
  }),
  removeTask: (changeSet: { tasks: Tasks; tabs: Tabs }) => ({
    type: systemActionTypes.REMOVE_TASK,
    payload: changeSet,
  }),
  toggleTask: (tasks: Tasks) => ({
    type: systemActionTypes.TOGGLE_TASK,
    payload: { tasks },
  }),
  updateTaskTitle: (tasks: Tasks) => ({
    type: systemActionTypes.UPDATE_TASK_TITLE,
    payload: { tasks },
  }),
  switchTab: (activeTab: string) => ({
    type: systemActionTypes.SWITCH_TAB,
    payload: { activeTab },
  }),
  addTab: (changeSet: { tasks: Tasks; tabs: Tabs; activeTab: string }) => ({
    type: systemActionTypes.ADD_TAB,
    payload: changeSet,
  }),
  addNotesTab: (changeSet: { tabs: Tabs; activeTab: string }) => ({
    type: systemActionTypes.ADD_NOTES_TAB,
    payload: changeSet,
  }),
  removeTab: (changeSet: { tasks: Tasks; tabs: Tabs }) => ({
    type: systemActionTypes.REMOVE_TAB,
    payload: changeSet,
  }),
  updateTabTitle: (tabs: Tabs) => ({
    type: systemActionTypes.UPDATE_TAB_TITLE,
    payload: { tabs },
  }),
  toggleDailyMode: (changeSet: { tasks: Tasks; tabs: Tabs }) => ({
    type: systemActionTypes.TOGGLE_DAILY_MODE,
    payload: changeSet,
  }),
  changeView: (changeSet: { activeView: Views; activeTab: string }) => ({
    type: systemActionTypes.CHANGE_VIEW,
    payload: changeSet,
  }),
  updateNote: (notes: Notes) => ({
    type: systemActionTypes.UPDATE_NOTE,
    payload: { notes },
  }),
  addNote: (changeSet: { notes: Notes; tabs: Tabs }) => ({
    type: systemActionTypes.ADD_NOTE,
    payload: changeSet,
  }),
  removeNote: (changeSet: { notes: Notes; tabs: Tabs }) => ({
    type: systemActionTypes.REMOVE_NOTE,
    payload: changeSet,
  }),
};

export const facadeActions = {
  addTask: (tabId: string) => ({
    type: facadeActionTypes.ADD_TASK,
    payload: tabId,
  }),
  removeTask: (tabId: string, taskId: string) => ({
    type: facadeActionTypes.REMOVE_TASK,
    payload: { tabId, taskId },
  }),
  toggleTask: (taskId: string) => ({
    type: facadeActionTypes.TOGGLE_TASK,
    payload: taskId,
  }),
  updateTaskTitle: (taskId: string, title: string) => ({
    type: facadeActionTypes.UPDATE_TASK_TITLE,
    payload: { taskId, title },
  }),
  addTab: () => ({ type: facadeActionTypes.ADD_TAB, payload: {} }),
  removeTab: (tabId: string) => ({
    type: facadeActionTypes.REMOVE_TAB,
    payload: tabId,
  }),
  updateTabTitle: (tabId: string, title: string) => ({
    type: facadeActionTypes.UPDATE_TAB_TITLE,
    payload: { tabId, title },
  }),
  toggleDailyMode: (tabId: string) => ({
    type: facadeActionTypes.TOGGLE_DAILY_MODE,
    payload: { tabId },
  }),
  changeView: (view: Views) => ({ type: facadeActionTypes.CHANGE_VIEW, payload: view }),
  updateNote: (noteId: string, title: string, text: string) => ({
    type: facadeActionTypes.UPDATE_NOTE,
    payload: { noteId, title, text },
  }),
  addNote: (tabId: string) => ({
    type: facadeActionTypes.ADD_NOTE,
    payload: tabId,
  }),
  removeNote: (tabId: string, noteId: string) => ({
    type: facadeActionTypes.REMOVE_NOTE,
    payload: { tabId, noteId },
  }),
};
