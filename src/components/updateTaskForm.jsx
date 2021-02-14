import React from 'react'
import { Link } from "react-router-dom";
import NavBar from './NavBar'
import Footer from './Footer'


class updateTaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: []
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const { match: {params: { id }}} = this.props;
        
          const url = `http://localhost:3001/tasks/${id}`;
  
          fetch(url)
          .then(response => {
              if (response.ok) {
              return response.json();
              }
              throw new Error("Network response was not ok.");
          })
          .then(response => this.setState({ task: response }))
          .catch(() => this.props.history.push(`/tasks/${id}`));
      }


    onChange = (event) => {
        this.setState({ 
            task: {...this.state.task, [event.target.name]: event.target.value }    
        });
    }

    onSubmit(event) {
    event.preventDefault();

    const { match: {params: { id }}} = this.props;
    const url = `http://localhost:3001/tasks/${id}`;
    const updatedTask = {...this.state}
    //-----------------------
    const reqObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(updatedTask)
    }
    //------------------------------
    fetch(url, reqObj)
        .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Network response was not ok.");
        })
        .then(response => this.props.history.push(`/goals/${this.state.task.goal_id}`))
        .catch(error => console.log(error.message));
    }



render() {      
    return (
        
        <div className='Task'>
        <NavBar />

            <div class="ui items">
                <h1 className="ui yellow image header">Goal: {this.props.location.state.goal_name}</h1>
            </div> 


            <div className="ui two column centered grid">
                <div className="twelve wide column">

                    <form className="ui form" onSubmit={this.onSubmit} >
                        
                        <div className="field">
                            <label>Name</label>
                            <input type="text" name="name" value={this.state.task.name} onChange={this.onChange}/>
                        </div>

                        <div className="field">
                            <label>Extra Info</label>
                            <textarea rows="3" name="description" value={this.state.task.description} onChange={this.onChange}/>
                        </div>


                        <button className="ui fluid large yellow submit button" type="submit">Update Task</button>
                        <div class="ui error message"></div>
                        
                    </form>
                </div>
            </div>

            
        </div>
    );
  }


}
export default updateTaskForm;