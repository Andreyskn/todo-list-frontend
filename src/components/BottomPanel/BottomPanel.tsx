import React from 'react';

import { Button } from '../base-ui';

import { BottomPanel__ } from './styled';

export class BottomPanel extends React.Component<any, any> {
  onSave = () => {
    const { state } = this.props;
    const body = JSON.stringify(state);
    const options = { headers: { 'content-type': 'application/json' }, body, method: 'post' };

    fetch('/api/save', options).catch((e) => console.error('Error', e));
  };

  render() {
    return (
      <BottomPanel__>
        <Button icon={'save'} onClick={this.onSave} styleMode='save' />
      </BottomPanel__>
    );
  }
}
