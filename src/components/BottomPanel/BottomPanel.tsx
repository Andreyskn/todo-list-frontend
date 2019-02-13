import React from 'react';

import { Button } from '../base-ui';
import { Preloader } from '../Preloader';
import { Error, Success } from 'Icons';

import { facadeActions } from '../../store/actions';
import { BottomPanel__, Indicator__ } from './styled';

export class BottomPanel extends React.Component<any, any> {
  onSave = () => this.props.dispatch(facadeActions.saveRequest());

  render() {
    const { requestStatus } = this.props;

    return (
      <BottomPanel__>
        <Button icon={'save'} onClick={this.onSave} styleMode='save' />
        {requestStatus && <Indicator status={requestStatus} />}
      </BottomPanel__>
    );
  }
}

class Indicator extends React.Component<any, any> {
  render() {
    switch (this.props.status) {
      case 'pending':
        return (
          <Indicator__>
            <Preloader size={'small'} />
          </Indicator__>
        );
      case 'success':
        return (
          <Indicator__>
            <Success />
          </Indicator__>
        );
      case 'fail':
        return (
          <Indicator__>
            <Error />
          </Indicator__>
        );

      default:
        return null;
    }
  }
}
