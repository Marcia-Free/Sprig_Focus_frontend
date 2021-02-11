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
        this.state = { goal: { tasks: [] } };

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


  render() {
          const { goal } = this.state;
          let taskList = "No tasks created yet";

          const goalDone = (
            <i class="ui circular olive right floated button" onClick={this.markComplete}>Complete</i>
          )
          const goalNotDone = (
            <i class="ui circular red right floated button" onClick={this.markComplete}>Not Complete</i>
          )
          // if (goal.task.length > 0) {
          //     taskList = goal.info
          //       .split(",")
          //       .map((task, index) => (
          //         <li key={index} className="list-group-item">
          //           {task}
          //         </li>
          //       ));
          //   }
          //   const goalInstruction = this.addHtmlEntities(goal.info);

          //     {/* goal={goal.name}
          //         info={goal.info}
          //         date={goal.date}
          //         time={goal.time}
          //         complete={goal.completed}
          //         user={goal.user_id}
          //         tag={goal.tag_id} */}
    
      return (
          
          <div className='Goals'>
          <NavBar />

                  <h1>Goal</h1>

          <VirtualPet />

              <div className="ui two column centered grid">

                  <div className="six wide grey column">
                    <div className="ButtonColumn centered column">
                        <Link to={`/goals/${goal.id}/edit`}><button className="ui yellow labeled icon button" >
                            <i className="columns icon"></i>
                            Update Goal
                        </button></Link>
                        <button className="ui yellow right labeled icon button"  onClick={this.handleDelete}>
                            <i className="sticky note icon"></i>
                            Delete Goal
                        </button>
                    </div>
                  </div>

                  <div className="eight wide olive column">
                      <div className="ui segments">
                              <a className="ui small image"> <img src={logo}/> </a>

                              <div className="ui segment">
                                  <h2 class="ui header">
                                      {goal.completed === true ? goalDone : goalNotDone}
                                      <div class="content"> {goal.name} </div>
                                  </h2>
                              </div>

                              <div className='ui two column grid'>
                                <span class="ui column">
                                  <i class="calendar outline icon"></i>
                                  {goal.date}
                                </span>
                                <span class="ui column">
                                  <i class="clock outline icon"></i>
                                  {goal.time}
                                </span>   
                              </div>

                                  <div className='ui secondary segment'>
                                  <div className="ui header">Info</div>
                                  <div className="description"> <p>{goal.info}</p> </div>
                              
                                  <a className="header"> <h3>Tasks</h3></a>
                                  <div className="ui divider"></div>
                                  
                                    <Link to='/new'><button className="ui yellow basic fluid labeled icon button">
                                          <i className="plus icon"></i>
                                          New Task
                                    </button></Link> 
                                  {taskList}
                              </div> 
                      </div>
                  </div>
              </div>

          </div>
      );
    }


}
export default Goal;