import React from 'react'
import { Link , Redirect} from "react-router-dom";
import NavBar from './NavBar'
import Footer from './Footer'
import VirtualPet from './VirtualPet'

import logo from '../images/sprig logo.png'
import { SetStateAction } from '@babylonjs/core';

class Goal extends React.Component {
  
  

    constructor(props) {
        super(props);
        this.state = { 
          goal: { tasks: [] },
          numoftasks: 0 };

          this.handleDelete = this.handleDelete.bind(this);
          this.markComplete = this.markComplete.bind(this);
    }

    componentDidMount() {
      const { match: {params: { id }}} = this.props;
      
        const url = `http://localhost:3001/api/v1/goals/${id}`;

        fetch(url)
        .then(response => {
            if (response.ok) {
            return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ goal: response }))
        .catch(() => this.props.history.push("/goals"));
    }

    componentDidUpdate(prevProps, prevState) {
      
      const tasklistlength = this.state.goal.tasks.length

      if(prevState.numoftasks !== tasklistlength) {
        console.log(prevState.numoftasks, tasklistlength)

        this.setState({
          numoftasks: tasklistlength
        })
      }
    }

    handleDelete() {
      const { match: {params: { id }}} = this.props;
      const url = `http://localhost:3001/api/v1/goals/${id}`;

        fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => {
              if (response.ok) {
                return response.json();
              }
              throw new Error("Network response was not ok.");
            })
            .then(() => this.props.history.push("/goals"))
            .catch(error => console.log(error.message));

    }

    markComplete() {
      const { match: {params: { id }}} = this.props;
      const url = `http://localhost:3001/api/v1/goals/${id}`;
      
       //-----------------------
      const reqObj = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body:  JSON.stringify({
          completed: !this.state.goal.completed
        })

      }
    //------------------------------
    fetch(url, reqObj)
        .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Network response was not ok.");
        })
        .then(response => this.props.history.push(`/goals/${response.id}`))
        .catch(error => console.log(error.message));

        this.setState({
          goal: {...this.state.goal, completed: !this.state.goal.completed}
        })

    }

    grabTasks() {
      const { goal } = this.state;
      const tasklistlength = goal.tasks.length

      return goal.tasks.map((task, index) => (

        <div className='Task item'>

        <i className="right triangle icon"></i>

          <div className="content">
            <div className="header">{task.name}</div>
            <div className="description">{task.description}</div>
          </div>

          <div class="ui small right floated icon buttons">
            <button class="ui button" onClick={() => this.taskDelete(task)}><i class="red eraser icon"></i></button>
            <Link to={{pathname: `/tasks/${task.id}/edit`, state: {goal_name: goal.name}}}><button class="ui button"><i class="black edit icon"></i></button></Link>
          </div>

      </div>
        ))

    }

    taskDelete(task) {
      const { match: {params: { id }}} = this.props;
      const url = `http://localhost:3001/api/v1/tasks/${task.id}`;

        fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => {
              if (response.ok) {
                return response.json();
              }
              throw new Error("Network response was not ok.");
            })
            .then(() => this.props.history.push(`/goals/${id}`))
            .catch(error => console.log(error.message));
    }


  render() {

          const { goal } = this.state;
          const goalTasks = goal.tasks
          const goalID = goal.id

          let taskList = "No tasks created yet";

          const goalDone = (
            <i className="ui circular olive right floated button" onClick={this.markComplete}>Complete</i>
          )
          const goalNotDone = (
            <i className="ui circular red right floated button" onClick={this.markComplete}>Not Complete</i>
          )
          
          
    
      return (
          
          <div className='Goals'>
          <NavBar />

                  <h1>Goal</h1>

          <VirtualPet />

              <div className="ui two column centered grid">

                  <div className="Main six wide column">
                    <div className="two ui buttons">
                        <Link to={`/goals/${goal.id}/edit`}><button className="ui yellow left attached button" >
                            Update Goal
                        </button></Link>

                        <button className="ui yellow right attached button"  onClick={this.handleDelete}>
                            Delete Goal
                        </button>
                    </div>
                  </div>

                  <div className="Main eight wide column">
                      <div className="ui segments">
                              <a className="ui small image"> <img src={logo}/> </a>

                              <div className="ui olive segment">
                                  <h2 class="ui header">
                                      {goal.completed === true ? goalDone : goalNotDone}
                                      <div class="content"> {goal.name} </div>
                                  </h2>
                              </div>

                              <div className='ui horizontal segments'>
                                <span class="ui olive segment">
                                  <i class="calendar outline icon"></i>
                                  {goal.date}
                                </span>

                                <span class="ui olive segment">
                                  <i class="clock outline icon"></i>
                                  {goal.time}
                                </span>   
                              </div>

                                  <div className='ui olive secondary segment'>
                                  <div className="ui header">Info</div>
                                  <div className="description"> <p>{goal.info}</p> </div>
                              
                                  <a className="header"> <h3>Tasks</h3></a>
                                  <div className="ui divider"></div>
                                  
                                    <Link to={{pathname: '/tasks/new', state: {goal_name: goal.name, goal_id: goalID}}}><button className="ui yellow basic fluid labeled icon button">
                                          <i className="plus icon"></i>
                                          New Task
                                    </button></Link> 

                                  <div className= 'ui middle aligned divided list'>

                                  {goalTasks.length > 0 ? this.grabTasks() : taskList}
                                  </div>
                              </div> 
                      </div>
                  </div>
              </div>

          </div>
      );
    }


}
export default Goal;