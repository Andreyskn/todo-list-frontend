import React from 'react';
import { Dispatch } from 'redux';
import { Task } from '../../store/reducer';
import { Button, Input } from '../base-ui';
import { TaskList } from '../TaskList';
import { facadeActions } from '../../store/actions';

import { Tab__ } from './styled';

interface TabProps {
  dispatch: Dispatch;
  title: string;
  tabId: string;
  tasks: Task[];
}

interface TabState {
  renamingMode: boolean;
}

export class Tab extends React.Component<TabProps, TabState> {
  state = {
    renamingMode: false,
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

  onKeyUp = (e) => {
    e.keyCode === 13 && this.renameTab(e);
    e.keyCode === 27 && this.setRenameMode(false);
  };

  render() {
    const { title, tabId, tasks, dispatch } = this.props;
    const { renamingMode } = this.state;

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
          {!renamingMode && <Button onClick={() => this.setRenameMode(true)} icon={'edit'} styleMode={'round'} />}
        </Tab__.Header>
        <TaskList tasks={tasks} dispatch={dispatch} addTask={this.addTask(tabId)} removeTask={this.removeTask(tabId)} />
      </Tab__>
    );
  }
}
