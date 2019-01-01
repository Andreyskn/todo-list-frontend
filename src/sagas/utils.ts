import { Task, Tasks, Tab, Tabs, Note, Notes, ApplicationState, Views } from '../store/reducer';
import { startOfTomorrow, startOfToday } from 'date-fns';

export const freshTabTitle = 'New tab';

export const generateId = (ids: string[]): string => `${Math.max(...ids.map((id) => parseInt(id, 10))) + 1}`;

export const createNewTask = (id: string, daily: boolean = false): Task => ({
  id,
  title: '',
  done: false,
  refreshTime: setRefeshTime(daily),
});

export const createNewNote = (id: string): Note => ({
  id,
  title: 'New note',
  text: '',
});

export const createNewTab = (id: string, taskId: string, kind: Views = 'tasks'): Tab => ({
  id,
  kind,
  title: freshTabTitle,
  contentIds: taskId ? [taskId] : [],
  settings: {
    daily: false,
  },
});

export const setRefeshTime = (dailyModeState: boolean): number | null => {
  if (!dailyModeState) return null;

  const refreshHour = 3; // 3 AM
  const currentHour = new Date().getHours();

  return currentHour < refreshHour ? startOfToday().setHours(refreshHour) : startOfTomorrow().setHours(refreshHour);
};
