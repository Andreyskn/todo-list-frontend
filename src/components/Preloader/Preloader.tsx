import React from 'react';

import { Preloader__ } from './styled';

export class Preloader extends React.Component<any, any> {
  render() {
    return (
      <Preloader__.Container>
        <Preloader__ size={this.props.size} />
      </Preloader__.Container>
    );
  }
}
