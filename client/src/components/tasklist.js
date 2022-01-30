import React from 'react';
import axios from 'axios';

class TaskList extends React.Component{
    state = {
        task: "",
        taskList: []
    };

    componentDidMount() {
        this.getTaskList();
        this.onDeleteClick();
    }

    getTaskList = () => {
        axios.get('http://localhost:4000/tasks')
        .then((response) => response.data)
        .then(response => {this.setState({ taskList: response })});
    };

    onDeleteClick = taskid => {
        axios.delete(`http://localhost:4000/deletetask/${taskid}`);
        this.getTaskList();
    };

    onSubmitClick = () => {
        axios.post('http://localhost:4000/addtask', {
            task: this.state.task
        });
        this.getTaskList();
        this.setState({task: ''});
    };


    render() {
        return (
            <div>
                <h3>TaskList</h3>
                <div className='ui input'>
                    <input value={this.state.task} onChange = {e => this.setState({
                        task: e.target.value
                    })} placeholder='Your Task' />
                </div>
                <button className='ui primary button basic' onClick={() => this.onSubmitClick()}>Submit</button>
                <hr />
                <div className="ui cards">
                  {this.state.taskList.map((task) => (
                    <div className="card">
                        <div className="content">
                            <div className="meta">{task.task}</div>
                            <div className="extra content">
                                <div className="ui two buttons">
                                    <div className="ui basic red button" onClick = {() => this.onDeleteClick(task.taskid)}>Delete</div>
                                </div>
                            </div>
                        </div> 
                    </div>
                  ))}   
                </div>
            </div>
        )
    }
}

export default TaskList