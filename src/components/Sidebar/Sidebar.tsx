import React from 'react';

import { Button } from '../base-ui';

import { facadeActions } from '../../store/actions';
import { Views } from '../../store/reducer';
import { Sidebar__ } from './styled';

export class Sidebar extends React.Component<any, any> {
  setView = (view: Views) => {
    const { activeView, dispatch } = this.props;
    activeView !== view && dispatch(facadeActions.changeView(view));
  };

  render() {
    return (
      <Sidebar__>
        <Sidebar__.Button>
          <Button text='Todo' onClick={() => this.setView('tasks')} />
        </Sidebar__.Button>
        <Sidebar__.Button>
          <Button text='Notes' onClick={() => this.setView('notes')} />
        </Sidebar__.Button>
      </Sidebar__>
    );
  }
}

// TODO: typings
