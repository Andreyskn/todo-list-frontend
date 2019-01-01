import React from 'react';
import { Dispatch } from 'redux';
import { Task, Note, Views } from '../../store/reducer';
import { Button, Input } from '../base-ui';
import { TaskList } from '../TaskList';
import { NoteList } from '../NoteList';
import { facadeActions } from '../../store/actions';

import { Tab__ } from './styled';

interface TabProps {
  dispatch: Dispatch;
  title: string;
  tabId: string;
  activeView: Views;
  entities: (Task | Note)[];
  settings: {
    daily?: boolean;
  };
}

interface TabState {
  renamingMode: boolean;
  openSettings: boolean;
}

export class Tab extends React.Component<TabProps, TabState> {
  state = {
    renamingMode: false,
    openSettings: false,
  };

  addTask = (tabId: string) => () => this.props.dispatch(facadeActions.addTask(tabId));

  removeTask = (tabId: string) => (taskId: string) => () =>
    this.props.dispatch(facadeActions.removeTask(tabId, taskId));

  setRenameMode = (renamingMode: boolean) => this.setState({ renamingMode });

  renameTab = (e) => {
    const { tabId, dispatch } = this.props;
    const newTitle = e.target.value.trim();
    dispatch(facadeActions.updateTabTitle(tabId, newTitle));
    this.setRenameMode(false);
  };

  toggleSettings = () => this.setState({ openSettings: !this.state.openSettings });

  toggleDailyMode = () => {
    const { tabId, dispatch } = this.props;
    dispatch(facadeActions.toggleDailyMode(tabId));
  };

  onKeyUp = (e) => {
    e.keyCode === 13 && this.renameTab(e);
    e.keyCode === 27 && this.setRenameMode(false);
  };

  render() {
    const { activeView, title, tabId, entities, settings, dispatch } = this.props;
    const { renamingMode, openSettings } = this.state;

    return (
      <Tab__>
        <Tab__.Header>
          {renamingMode ? (
            // TODO: Change to base-ui/Input
            <Tab__.Input
              type='text'
              autoFocus={true}
              defaultValue={title}
              onBlur={this.renameTab}
              onKeyUp={this.onKeyUp}
            />
          ) : (
            <Tab__.Title>{title}</Tab__.Title>
          )}
          {!renamingMode && <Button onClick={() => this.setRenameMode(true)} icon={'edit'} styleMode={'rename'} />}
          {!renamingMode && <Button onClick={this.toggleSettings} icon={'settings'} styleMode={'settings'} />}
          {openSettings && (
            <Tab__.Settings>
              {settings.hasOwnProperty('daily') ? (
                <React.Fragment>
                  <input type='checkbox' id='daily' checked={settings.daily} onChange={this.toggleDailyMode} />
                  <label htmlFor='daily'>Refresh daily</label>
                </React.Fragment>
              ) : (
                'Empty'
              )}
            </Tab__.Settings>
          )}
        </Tab__.Header>
        {activeView === 'tasks' && (
          <TaskList
            tasks={entities as Task[]}
            dispatch={dispatch}
            addTask={this.addTask(tabId)}
            removeTask={this.removeTask(tabId)}
          />
        )}
        {activeView === 'notes' && <NoteList notes={entities as Note[]} dispatch={dispatch} tabId={tabId} />}
      </Tab__>
    );
  }
}
