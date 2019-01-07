import React from 'react';

import { Button } from '../base-ui';

import { facadeActions } from '../../store/actions';
import { Views } from '../../store/reducer';
import { history } from '../../store';

import { Sidebar__ } from './styled';

export class Sidebar extends React.Component<any, any> {
  componentDidMount() {
    const { dispatch } = this.props;

    // listen for forward/backward navigation
    history.listen((location, action) => {
      const path = location.pathname.slice(1) || 'tasks';
      action === 'POP' && dispatch(facadeActions.changeView(path));
    });
  }

  setView = (view: Views) => {
    const { activeView, dispatch } = this.props;

    if (activeView !== view) {
      dispatch(facadeActions.changeView(view));
      history.push(`/${view}`);
    }
  };

  render() {
    const { activeView } = this.props;

    return (
      <Sidebar__>
        <Sidebar__.Button active={activeView === 'tasks'}>
          <Button text='Todo' onClick={() => this.setView('tasks')} styleMode={'nav'} />
        </Sidebar__.Button>
        <Sidebar__.Button active={activeView === 'notes'}>
          <Button text='Notes' onClick={() => this.setView('notes')} styleMode={'nav'} />
        </Sidebar__.Button>
      </Sidebar__>
    );
  }
}
