import { Task, Tasks, Tab, Tabs, ApplicationState, Views } from '../store/reducer';
import { startOfTomorrow, startOfToday } from 'date-fns';

const freshTabTitle = 'New tab';

const generateId = (ids: string[]): string => `${Math.max(...ids.map((id) => parseInt(id, 10))) + 1}`;

const createNewTask = (id: string, daily: boolean = false): Task => ({
  id,
  title: '',
  done: false,
  refreshTime: setRefeshTime(daily),
});

const createNewTab = (id: string, taskId: string, kind: Views = 'tasks'): Tab => ({
  id,
  kind,
  title: freshTabTitle,
  contentIds: [taskId],
  settings: {
    daily: false,
  },
});

const setRefeshTime = (dailyModeState: boolean): number | null => {
  if (!dailyModeState) return null;

  const refreshHour = 3; // 3 AM
  const currentHour = new Date().getHours();

  return currentHour < refreshHour ? startOfToday().setHours(refreshHour) : startOfTomorrow().setHours(refreshHour);
};

export { generateId, createNewTask, createNewTab, setRefeshTime, freshTabTitle };
