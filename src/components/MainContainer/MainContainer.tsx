import React from 'react';
import { Dispatch } from 'redux';

import { Tab } from '../Tab';
import { TabSwitchPanel } from '../TabSwitchPanel';
import { BottomPanel } from '../BottomPanel';

import { systemActions } from '../../store/actions';
import { ApplicationState } from '../../store/reducer';
import { MainContainer__ } from './styled';

interface MainContainerProps extends ApplicationState {
  dispatch: Dispatch;
}

interface MainContainerState {
  loading: boolean;
}

export class MainContainer extends React.Component<MainContainerProps, MainContainerState> {
  state = {
    loading: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;

    fetch('/api/init')
      .then((res) => res.status === 200 && res.json())
      .then((data) => data && dispatch(systemActions.init(data)))
      .then(() => this.setState({ loading: false }))
      .catch((err) => console.error('Failed init request', err));
  }

  render() {
    const { activeTab, tabs, tasks, dispatch } = this.props;
    const { loading } = this.state;
    const tabToRender = tabs[activeTab];

    if (loading || !tabToRender) return null;

    const activeTasks = tabToRender.taskIds.map((taskId) => tasks[taskId]);

    return (
      <MainContainer__>
        <TabSwitchPanel dispatch={dispatch} tabs={tabs} activeTab={activeTab} />
        <Tab tabId={tabToRender.id} title={tabToRender.title} tasks={activeTasks} dispatch={dispatch} />
        <BottomPanel state={{ activeTab, tabs, tasks }} />
      </MainContainer__>
    );
  }
}
