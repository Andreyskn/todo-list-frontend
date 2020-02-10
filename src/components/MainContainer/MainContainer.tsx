import React from 'react';
import { Dispatch } from 'redux';

import { Sidebar } from '../Sidebar';
import { Tab } from '../Tab';
import { TabSwitchPanel } from '../TabSwitchPanel';
import { BottomPanel } from '../BottomPanel';
import { Preloader } from '../Preloader';

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
      setTimeout(reject, 300, { timeout: true });
    });

    Promise.race<any>([fetch('http://localhost:3000/api/init', { signal }), fetchTimeout])
      .then((res) => res.status === 200 && res.json())
      .then((data) => data && dispatch(systemActions.init(data)))
      .catch((err) => {
        err.timeout && abortController.abort();
        console.warn('Init request to server has failed:', err.timeout ? 'Timeout' : err);
      })
      .then(() => {
        const data = localStorage.getItem('todo-list-state');
        if (data) {
          dispatch(systemActions.init(JSON.parse(data)));
          console.log('Loaded state from localStorage');
        } else {
          console.log('localStorage is empty');
        }
      })
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const {
      application: { activeView, activeTab, tabs, lastRequestStatus },
      dispatch,
    } = this.props;
    const { loading } = this.state;
    const tabToRender = tabs[activeTab];

    if (loading || !tabToRender) return <Preloader />;

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
          <BottomPanel requestStatus={lastRequestStatus} dispatch={dispatch} />
        </MainContainer__.Content>
      </MainContainer__>
    );
  }
}
