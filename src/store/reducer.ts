import { systemActionTypes } from './actions';
import { Reducer } from 'redux';

export type Views = 'tasks' | 'notes';

export type Task = {
  id: string;
  title: string;
  done: boolean;
  refreshTime: number | null;
};

export type Tasks = {
  [key: string]: Task;
};

export type Tab = {
  id: string;
  kind: Views;
  title: string;
  contentIds: string[];
  settings: {
    daily?: boolean;
  };
};

export type Tabs = {
  [key: string]: Tab;
};

export type Note = {
  id: string;
  title: string;
  text: string;
};

export type Notes = {
  [key: string]: Note;
};

export type ApplicationState = {
  activeView: Views;
  activeTab: string;
  tabs: Tabs;
  tasks: Tasks;
  notes: Notes;
};

const initialState: ApplicationState = {
  activeView: 'tasks',
  activeTab: '0',
  tabs: {
    '0': {
      id: '0',
      kind: 'tasks',
      title: 'Tasks',
      contentIds: ['0'],
      settings: {
        daily: false,
      },
    },
    '1': {
      id: '1',
      kind: 'notes',
      title: 'Notes',
      contentIds: ['0'],
      settings: {},
    },
  },
  tasks: {
    '0': {
      id: '0',
      title: '',
      done: false,
      refreshTime: null,
    },
  },
  notes: {
    '0': {
      id: '0',
      title: '',
      text: '',
    },
  },
};

export const reducer: Reducer<ApplicationState> = (state = initialState, { type, payload }) => {
  switch (type) {
    case systemActionTypes.INIT:
      return { ...payload };
    case systemActionTypes.ADD_TASK:
    case systemActionTypes.REMOVE_TASK:
    case systemActionTypes.TOGGLE_TASK:
    case systemActionTypes.UPDATE_TASK_TITLE:
    case systemActionTypes.SWITCH_TAB:
    case systemActionTypes.ADD_TAB:
    case systemActionTypes.REMOVE_TAB:
    case systemActionTypes.UPDATE_TAB_TITLE:
    case systemActionTypes.TOGGLE_DAILY_MODE:
    case systemActionTypes.CHANGE_VIEW:
      return { ...state, ...payload };

    default:
      return state;
  }
};
