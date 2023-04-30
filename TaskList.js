import React from 'react';
import TaskItem from './TaskItem'
import List from '@mui/material/List'

class TaskList extends React.Component {

	constructor(props) {
		super(props);
	}

	itemList = () => {
		
		let counter = -1;
		let tasks = this.props.list.map(task => {
			counter++;
			return (
				<TaskItem key={counter} text={task} time={this.props.listTime[counter]} onDeleteTask={this.props.onDeleteTask}/>
			);
		});

		return tasks;
	}

	render() {
		
		const tasks = this.itemList();

		return (
		
		<List>
			{tasks}
		</List>
		);
	}
}

export default TaskList;
