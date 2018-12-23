import React from 'react';
import { Dispatch } from 'redux';

import { Sidebar } from '../Sidebar';
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
    const { activeView, activeTab, tabs, tasks, notes, dispatch } = this.props;
    const { loading } = this.state;
    const tabToRender = tabs[activeTab];

    if (loading || !tabToRender) return null;

    const activeEntities = tabToRender.contentIds.map((entityId) => this.props[activeView][entityId]);
    const visibleTabs = Object.keys(tabs)
      .filter((key) => tabs[key].kind === activeView)
      .reduce((acc, cur) => {
        acc[cur] = tabs[cur];
        return acc;
      }, {});

    return (
      <MainContainer__>
        <Sidebar dispatch={dispatch} activeView={activeView} />
        <MainContainer__.Content>
          <TabSwitchPanel dispatch={dispatch} tabs={visibleTabs} activeTab={activeTab} />
          <Tab
            activeView={activeView}
            tabId={tabToRender.id}
            title={tabToRender.title}
            entities={activeEntities}
            dispatch={dispatch}
            settings={tabToRender.settings}
          />
          <BottomPanel state={{ activeTab, tabs, tasks }} />
        </MainContainer__.Content>
      </MainContainer__>
    );
  }
}
