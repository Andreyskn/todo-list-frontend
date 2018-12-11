import React from 'react';

import { Button } from '../base-ui';

import { BottomPanel__ } from './styled';

const noop = () => {
  alert('Not implemented!');
};

export class BottomPanel extends React.Component {
  render() {
    return (
      <BottomPanel__>
        <Button icon={'save'} onClick={noop} styleMode='save' />
      </BottomPanel__>
    );
  }
}
