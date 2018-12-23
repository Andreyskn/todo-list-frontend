import React from 'react';

import { Button } from '../base-ui';

import { Sidebar__ } from './styled';

export class Sidebar extends React.Component {
  doNothing = () => {};

  render() {
    return (
      <Sidebar__>
        <Sidebar__.Button>
          <Button text='Todo' onClick={this.doNothing} />
        </Sidebar__.Button>
        <Sidebar__.Button>
          <Button text='Notes' onClick={this.doNothing} />
        </Sidebar__.Button>
      </Sidebar__>
    );
  }
}
