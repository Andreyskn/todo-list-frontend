import React from 'react';
import { Dispatch } from 'redux';

import Tab from '../Tab';
import { TabSwitchPanel } from '../TabSwitchPanel';
import { Button } from '../base-ui';

import { ApplicationState } from '../../store/reducer';
import { MainContainer__ } from './styled';

interface MainContainerProps extends ApplicationState {
	dispatch: Dispatch;
}

const noop = () => {
	return;
};

export class MainContainer extends React.Component<MainContainerProps, {}> {
	render() {
		const { activeTab, tabs, tasks, dispatch } = this.props;
		const tabToRender = tabs[activeTab];

		if (!tabToRender) return null;

		const activeTasks = tabToRender.taskIds.map((taskId) => tasks[taskId]);

		return (
			<MainContainer__>
				{/* <Button text='Save' onClick={noop} />
				<br /> */}
				<TabSwitchPanel dispatch={dispatch} tabs={tabs} activeTab={activeTab} />
				<Tab tabId={tabToRender.id} title={tabToRender.title} tasks={activeTasks} dispatch={dispatch} />
			</MainContainer__>
		);
	}
}
