import React from 'react';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

class TaskForm extends React.Component {

	constructor(props) {

		super(props);
		this.state = {
			task: ""
		};
	}

	render() {
		return (
		<form>
			<p><TextField variant="standard" value={this.state.task} placeholder="Add your new task" onChange={event => {
				this.setState({
					task: event.target.value
				});
			}}/>
		  	<Button variant="contained" type="button" onClick={() => {
				
				if (this.state.task.trim() === "") {
					this.setState({
						task: ""
					});
					return;
				}
				
				this.props.onAddTask(this.state.task);
				this.setState({
					task: ""
				});
			}}>+</Button></p>
         </form>
		);
	}
}

export default TaskForm;
