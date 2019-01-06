import React from 'react';

import { Button } from '../base-ui';

import { BottomPanel__ } from './styled';

export class BottomPanel extends React.Component<any, any> {
  onSave = () => {
    const { state } = this.props;

    const abortController = new AbortController();
    const signal = abortController.signal;
    const body = JSON.stringify(state);
    const options = { headers: { 'content-type': 'application/json' }, body, method: 'post', signal };
    const fetchTimeout = new Promise((resolve, reject) => {
      setTimeout(reject, 1000, { timeout: true });
    });

    Promise.race([fetch('/api/save', options), fetchTimeout]).catch((err) => {
      err.timeout && abortController.abort();
      console.error('Save request failed:', err.timeout ? 'Timeout' : err);
    });
  };

  render() {
    return (
      <BottomPanel__>
        <Button icon={'save'} onClick={this.onSave} styleMode='save' />
      </BottomPanel__>
    );
  }
}
