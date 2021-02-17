import React from 'react'
import { Link , Redirect} from "react-router-dom";

import logo from '../images/sprig logo.png'
import { SetStateAction } from '@babylonjs/core';

import { connect } from 'react-redux'
import { currentUser } from '../actions/auth'

import MusicPlayer from './MusicPlayer'

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

      if (!this.props.currentUser) {
        this.props.history.push('/home')
    }

      const { match: {params: { id }}} = this.props;
      
        const url = `http://localhost:3001/goals/${id}`;

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
      const { goal } = this.state;
      
      const correctPath = goal.completed === false ? '/goals' : '/completed'
      const url = `http://localhost:3001/goals/${id}`;

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
            .then(() => this.props.history.push(correctPath))
            .catch(error => console.log(error.message));

    }

    markComplete() {
      const { match: {params: { id }}} = this.props;
      const url = `http://localhost:3001/goals/${id}`;
      
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
            <button class="ui basic button" onClick={() => this.taskDelete(task)}><i class="red eraser icon"></i></button>
            <Link class="ui basic button" to={{pathname: `/tasks/${task.id}/edit`, state: {goal_name: goal.name}}}><i class="black edit icon"></i></Link>
          </div>

      </div>
        ))

    }

    taskDelete(task) {
      const { match: {params: { id }}} = this.props;
      const url = `http://localhost:3001/tasks/${task.id}`;

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
          
          <div className='Goal'>


              <div className="Main ui two column centered grid">

                  <div className="six wide column">
                    <div className="two ui buttons">
                        <Link className="ui fluid button" to={`/goals/${goal.id}/edit`}>Update Goal</Link>

                        <button className="ui fluid button"  onClick={this.handleDelete}>
                            Delete Goal
                        </button>
                    </div>
                    <MusicPlayer/>
                  </div>

                  <div className="ten wide column">
                      <div className="ui segments">
                              <a className="ui small image"> <img src={logo}/> </a>

                              <div className="ui segment">
                                  <h2 class="ui header">
                                      {goal.completed === true ? goalDone : goalNotDone}
                                      <div class="content"> {goal.name} </div>
                                  </h2>
                              </div>

                              <div className='ui horizontal segments'>
                                <span class="ui segment">
                                  <i class="calendar outline icon"></i>
                                  {goal.date}
                                </span>

                                <span class="ui segment">
                                  <i class="clock outline icon"></i>
                                  {goal.time}
                                </span>   
                              </div>

                                  <div className='ui secondary segment'>
                                  <div className="ui header">Info</div>
                                  <div className="description"> <p>{goal.info}</p> </div>
                              
                                  <div className="ui grey header"> <h3>Tasks</h3></div>
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

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    goals: state.goals
  }
}
export default connect(mapStateToProps)(Goal);