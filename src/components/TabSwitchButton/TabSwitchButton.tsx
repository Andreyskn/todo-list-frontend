import React from 'react';

import { Button } from '../base-ui';

import { TabSwitchButton__ } from './styled';

export class TabSwitchButton extends React.Component<any, any> {
  render() {
    const { active, tabName, switchTab, removeTab } = this.props;

    return (
      <TabSwitchButton__ active={active}>
        <Button text={tabName} onClick={switchTab} styleMode={'tab-switcher'} />
        <Button text='×' onClick={removeTab} styleMode={'tab-close'} />
      </TabSwitchButton__>
    );
  }
}
