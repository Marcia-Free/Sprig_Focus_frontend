import React from 'react'
import { Link , Redirect} from "react-router-dom";
import { connect } from 'react-redux'
import { currentUser } from '../actions/auth'

import logo from '../images/sprig logo.png'
import { SetStateAction } from '@babylonjs/core';



import MusicPlayer from './MusicPlayer'

class Goal extends React.Component {

    formatTime(time) {
      const convertTime = String(time)
      const timeSlice = convertTime.slice(11,-1)
      let hours = timeSlice.slice(0,2)
      let minutes = timeSlice.slice(3,5)
      let ending = 'AM'

          if (hours > 12) {
              hours -= 12
              ending = 'PM'
          }
      let formattedTime = `${hours}:${minutes} ${ending}`

          if(time === null) {
               return ' '
          }

          return formattedTime

    }

    formatDate(date) {
        const splitDate = date ? date.split('-') : '000'
        const formattedDate = `${splitDate[1]}-${splitDate[2]}-${splitDate[0]}`
        const correctDate = formattedDate === '0-0-0' ? '' : formattedDate

        return correctDate
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

    // markTaskComplete(task) {
    //   const { match: {params: { id }}} = this.props;
    //   const url = `http://localhost:3001/tasks/${task.id}`;
    //   const updatedTask = {completed: !task.completed}
    //    //-----------------------
    //   const reqObj = {
    //     method: 'PATCH',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body:  JSON.stringify(updatedTask)

    //   }
    // //------------------------------
    // fetch(url, reqObj)
    //     .then(response => {
    //     if (response.ok) {
    //         return response.json();
    //     }
    //     throw new Error("Network response was not ok.");
    //     })
    //     .catch(error => console.log(error.message));
    // }

    grabGoal() {
      const { goals } = this.props;

      return goals.filter((goal, index) => (
        goal.id === parseInt(this.props.match.params.id)
      ))
    }
    
    grabTasks(goalID) {
      const { tasks } = this.props;

      const currentGoal = this.grabGoal()
      const goal = currentGoal[0]

      const currentTasks = tasks.filter((task, index) => (
        task.completed === false && task.goal_id === goalID
      ))

      const tasklistlength = currentTasks.length

      return currentTasks.map((task, index) => (

        <div className='Task item'  key={task.id}>

        <i className="right triangle icon"></i>

          <div className="content">
            <div className="header">{task.name}</div>


            <div className="description">{task.description}</div>
          </div>


          <div class="ui small right floated icon buttons">
            <button class="ui basic button" onClick={() => this.taskDelete(task)}><i class="red eraser icon"></i> Delete</button>
            <Link class="ui basic button" to={{pathname: `/tasks/${task.id}/edit`, state: {goal_name: goal.name}}}><i class="black edit icon"></i> Edit</Link>
            <button class="ui basic button" onClick={() => this.markTaskComplete(task)}><i class="grey x icon"></i> Mark complete</button>

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

          const currentGoal = this.grabGoal()
          const goal = currentGoal ? currentGoal[0] : null          

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
                  <div className='GoalCard ui fluid card'>
                  {goal.imageurl ? <img className="GoalImage ui image" src={goal.imageurl}></img> : null }

                              <div className="ui segment">
                                  <h2 class="ui header">
                                      {goal.completed === true ? goalDone : goalNotDone}
                                      <div className="content"> {goal.name} </div>
                                  </h2>
                              </div>

                              <div className='ui horizontal segments'>
                                <span class="ui segment">
                                  <i class="calendar outline icon"></i>
                                  {this.formatDate(goal.date)}
                                </span>

                                <span class="ui segment">
                                  <i class="clock outline icon"></i>
                                  {this.formatTime(goal.time)}
                                </span>   
                              </div>

                                  <div className='ui secondary segment'>
                                  <div className="ui header">Info</div>
                                  <div className="description"> <p>{goal.info}</p> </div>
                              
                                  <div className="ui grey header"> <h3>Tasks</h3></div>
                                  <div className="ui divider"></div>
                                  
                                    <Link to={{pathname: '/tasks/new', state: {goal_name: goal.name, goal_id: goal.id}}}><button className="ui yellow basic fluid labeled icon button">
                                          <i className="plus icon"></i>
                                          New Task
                                    </button></Link> 

                                  <div className= 'ui middle aligned divided list'>

                                  {this.grabTasks(goal.id).length > 0 ? this.grabTasks(goal.id) : taskList}
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
    goals: state.goals,
    tasks: state.tasks
  }
}
export default connect(mapStateToProps)(Goal);