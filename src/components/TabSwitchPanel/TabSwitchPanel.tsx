import React from 'react';

import { Button } from '../base-ui';
import { TabSwitchButton } from '../TabSwitchButton';

import { systemActions, facadeActions } from '../../store/actions';
import { TabSwitchPanel__ } from './styled';

export class TabSwitchPanel extends React.Component<any, any> {
  switchTab = (tabId) => {
    const { dispatch, activeTab } = this.props;
    if (tabId !== activeTab) dispatch(systemActions.switchTab(tabId));
  };

  removeTab = (tabId) => this.props.dispatch(facadeActions.removeTab(tabId));

  addTab = () => this.props.dispatch(facadeActions.addTab());

  render() {
    const { tabs, activeTab } = this.props;

    return (
      <TabSwitchPanel__>
        {Object.keys(tabs).map((tabId) => (
          <TabSwitchButton
            key={tabId}
            active={tabId === activeTab}
            tabName={tabs[tabId].title}
            switchTab={() => this.switchTab(tabId)}
            removeTab={() => this.removeTab(tabId)}
          />
        ))}
        <Button text='+' onClick={this.addTab} styleMode={'tab-add'} />
      </TabSwitchPanel__>
    );
  }
}
