import React from 'react';
import { Dispatch } from 'redux';
import Tab from './Tab';
import TabSwitcher from './TabSwitcher';
import { ApplicationState } from '../store/reducer';
import { Button } from './base-ui';

interface MainContainerProps extends ApplicationState {
	dispatch: Dispatch,
}

export default class MainContainer extends React.Component<MainContainerProps, {}> {

	render() {
		const { activeTab, tabs, tasks, dispatch } = this.props;
		const tabToRender = tabs[activeTab];

		if (!tabToRender) return null;

		const activeTasks = tabToRender.taskIds.map(taskId => tasks[taskId]);

		return (
			<div style={{paddingLeft: '500px', paddingTop: '30px'}}>
				<Button text='Save' onClick={() => {}} /><br/>
				<TabSwitcher dispatch={dispatch} tabs={tabs} activeTab={activeTab} />
				<Tab 
					tabId={tabToRender.id}
					title={tabToRender.title}
					tasks={activeTasks}
					dispatch={dispatch}
				/>
			</div>
		)
	}
}
