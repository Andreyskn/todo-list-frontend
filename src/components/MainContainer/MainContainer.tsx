import React from 'react';
import { Dispatch } from 'redux';

import { Sidebar } from '../Sidebar';
import { Tab } from '../Tab';
import { TabSwitchPanel } from '../TabSwitchPanel';
import { BottomPanel } from '../BottomPanel';

import { systemActions, facadeActions } from '../../store/actions';
import { ApplicationState } from '../../store/reducer';
import { MainContainer__ } from './styled';

interface MainContainerProps {
  router: any;
  application: ApplicationState;
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
    const {
      dispatch,
      router: {
        location: { pathname },
      },
      application: { activeView },
    } = this.props;

    const path = pathname.slice(1);

    if (['tasks', 'notes'].includes(path) && path !== activeView) {
      dispatch(facadeActions.changeView(path));
    }

    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetchTimeout = new Promise((resolve, reject) => {
      setTimeout(reject, 1000, { timeout: true });
    });

    Promise.race<any>([fetch('/api/init', { signal }), fetchTimeout])
      .then((res) => res.status === 200 && res.json())
      .then((data) => data && dispatch(systemActions.init(data)))
      .catch((err) => {
        err.timeout && abortController.abort();
        console.error('Init request failed:', err.timeout ? 'Timeout' : err);
      })
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const {
      application: { activeView, activeTab, tabs, tasks, notes },
      dispatch,
    } = this.props;
    const { loading } = this.state;
    const tabToRender = tabs[activeTab];

    if (loading || !tabToRender) return null;

    const activeEntities = tabToRender.contentIds.map((entityId) => this.props.application[activeView][entityId]);
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
          <BottomPanel state={{ activeTab, tabs, tasks, notes }} />
        </MainContainer__.Content>
      </MainContainer__>
    );
  }
}
