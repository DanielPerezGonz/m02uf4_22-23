import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import Title from './Title';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import Chip from '@mui/material/Chip';
import Badge from '@mui/material/Badge';
import AnnouncementIcon from '@mui/icons-material/Announcement';

import './TODO.css';


class App extends React.Component {
  
  constructor(props) {
  	super(props);
	this.state = {
		tasklistIds: [],
		tasklist: [],
		tasklistTime: []
	};
  }

  componentDidMount () {
	
	this.fetchData();
  }

  fetchData = () => {
	fetch('http://192.168.1.37:8080', { method: "GET" })
		.then(response => response.json())
        .then(data => this.createTasklist(data));
  }
  
  createTasklist = (list) => {

  	this.state.tasklistIds = [];
	this.state.tasklist = [];
	this.state.tasklistTime = [];
	
	if (list.length <= 0) {
		return;
	}

	for (let i = 0; i < list.length; i++) {
		this.state.tasklistIds.unshift(list[i]._id);
		this.state.tasklist.unshift(list[i].tasks);
		this.state.tasklistTime.unshift(list[i].time);
	}
	
	this.setState ({
		tasklistIds: this.state.tasklistIds,
		tasklist: this.state.tasklist,
		taskListTime: this.state.tasklistTime
	});
  }

  addTask = (task) => {
	
	fetch('http://192.168.1.37:8080', {
		method: "POST",
		body: '{"task":"' + task + '", "remove": "false"}'
	})
		.then(response => response.json())
		.then(data => this.fetchData());
  }

  deleteTask = (task) => {
	
	console.log(task);
	fetch('http://192.168.1.37:8080', {
		method: "POST",
		body: '{"task":"' + task + '", "remove": "true"}'
	})
		.then(response => response.json)
		.then(data => this.fetchData());
  }

  render() {

  	return (
    	<Box 
			sx={{
				display:'flex',
				flexWrap:'wrap',
				justifyContent:'center',
				alignContent:'center',
				height: '100%',
				background: 'linear-gradient(#e66465, #9198e5)'
			}}
		>
			<Paper elevation={3}
				sx={{
					padding:'16px'
				}}
			>
				<Title text="ToDO App" />
				<TaskForm onAddTask={this.addTask} />
				<TaskList list={this.state.tasklist} listTime={this.state.tasklistTime} onDeleteTask={this.deleteTask}/>
				<Chip 
					variant="outlined"
					color="info"
					icon={<Badge badgeContent={this.state.tasklist.length} color="info"><AnnouncementIcon color="action"/></Badge>}
					label="pending tasks"
				/>
			</Paper>
    	</Box>
  	);
  }
}

export default App;
