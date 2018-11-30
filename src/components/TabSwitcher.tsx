import React from 'react';
import { Button } from './base-ui';
import { systemActions, facadeActions } from '../store/actions';

export default class TabSwitcher extends React.Component<any, any> {

	switchTab = (tabId) => {
		const { dispatch, activeTab } = this.props;
		if (tabId !== activeTab) dispatch(systemActions.switchTab(tabId));
	}

	removeTab = (tabId) => this.props.dispatch(facadeActions.removeTab(tabId));

	addTab = () => this.props.dispatch(facadeActions.addTab());

	render() {
		const { tabs, activeTab } = this.props;

		return (
			<div style={{ display: 'flex', marginBottom: '20px' }} >
				{Object.keys(tabs).map(tabId => (
					<span key={tabId} style={{ display: 'flex', marginRight: '10px', borderBottom: tabId == activeTab && '3px solid red' }}>
						<Button text={tabs[tabId].title} onClick={() => this.switchTab(tabId)} />
						<Button text='x' onClick={() => this.removeTab(tabId)} />
					</span>
				))}
				<Button text='+' onClick={this.addTab} />
			</div>
		)
	}
}
