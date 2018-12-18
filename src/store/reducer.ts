import { systemActionTypes } from './actions';
import { Reducer } from 'redux';

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
  title: string;
  taskIds: string[];
  daily: boolean;
};

export type Tabs = {
  [key: string]: Tab;
};

export type ApplicationState = {
  activeTab: string;
  tabs: Tabs;
  tasks: Tasks;
};

const initialState: ApplicationState = {
  activeTab: '0',
  tabs: {
    '0': {
      id: '0',
      title: 'Tasks',
      taskIds: ['0'],
      daily: false,
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
      return { ...state, ...payload };

    default:
      return state;
  }
};
