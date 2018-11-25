import React from 'react';
import { Dispatch } from 'redux';
import Tab from './Tab';
import TabSwitcher from './TabSwitcher';
import { facadeActions } from '../store/actions';
import { ApplicationState } from '../store/reducer';

interface MainContainerProps extends ApplicationState {
	dispatch: Dispatch,
}

export default class MainContainer extends React.Component<MainContainerProps, {}> {

	addTask = (tabId: number) => () => this.props.dispatch(facadeActions.addTask(tabId));

	removeTask = (tabId: number) => (taskId: number) => () => this.props.dispatch(facadeActions.removeTask(tabId, taskId));

	render() {
		const { activeTab, tabs, tasks, dispatch } = this.props;
		const tabToRender = tabs.byId[activeTab];
		const activeTasks = tabToRender.taskIds.map(taskId => tasks.byId[taskId]);

		return (
			<div style={{paddingLeft: '500px', paddingTop: '30px'}}>
				<TabSwitcher dispatch={dispatch} tabs={tabs} activeTab={activeTab} />
				<Tab 
					tabId={tabToRender.id}
					title={tabToRender.title}
					tasks={activeTasks}
					dispatch={dispatch}
					addTask={this.addTask}
					removeTask={this.removeTask}
				/>
			</div>
		)
	}
}
