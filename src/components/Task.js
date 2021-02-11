import React from 'react'
import { Link , Redirect} from "react-router-dom";

import { SetStateAction } from '@babylonjs/core';

class Task extends React.Component {
  

    constructor(props) {
        super(props);
        this.state = { task: {} };

          // this.handleDelete = this.handleDelete.bind(this);
          // this.markComplete = this.markComplete.bind(this);
    }

    // componentDidMount() {
    //   const { match: {params: { id }}} = this.props;
      
    //     const url = `http://localhost:3001/api/v1/tasks/${id}`;

    //     fetch(url)
    //     .then(response => {
    //         if (response.ok) {
    //         return response.json();
    //         }
    //         throw new Error("Network response was not ok.");
    //     })
    //     .then(response => this.setState({ task: response }))
    //     .catch(() => this.props.history.push("/tasks"));
    // }

    // handleDelete() {
    //   const { match: {params: { id }}} = this.props;
    //   const url = `http://localhost:3001/api/v1/goals/${id}`;

    //     fetch(url, {
    //         method: "DELETE",
    //         headers: {
    //           "Content-Type": "application/json"
    //         }
    //       })
    //         .then(response => {
    //           if (response.ok) {
    //             return response.json();
    //           }
    //           throw new Error("Network response was not ok.");
    //         })
    //         .then(() => this.props.history.push("/goals"))
    //         .catch(error => console.log(error.message));

    // }

    // markComplete() {
    //   const { match: {params: { id }}} = this.props;
    //   const url = `http://localhost:3001/api/v1/goals/${id}`;
      
    //    //-----------------------
    //   const reqObj = {
    //     method: 'PATCH',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body:  JSON.stringify({
    //       completed: !this.state.goal.completed
    //     })

    //   }
    // //------------------------------
    // fetch(url, reqObj)
    //     .then(response => {
    //     if (response.ok) {
    //         return response.json();
    //     }
    //     throw new Error("Network response was not ok.");
    //     })
    //     .then(response => this.props.history.push(`/goals/${response.id}`))
    //     .catch(error => console.log(error.message));

    //     this.setState({
    //       goal: {...this.state.goal, completed: !this.state.goal.completed}
    //     })

    // }


  render() {
          const { task } = this.state;
        
          // const goalDone = (
          //   <i class="ui circular olive right floated button" onClick={this.markComplete}>Complete</i>
          // )
          // const goalNotDone = (
          //   <i class="ui circular red right floated button" onClick={this.markComplete}>Not Complete</i>
          // )
       
    
      return (
        
        <div className='Task item'>
    
          <div class="right floated content">
            <div class="ui circular button">Complete</div>
          </div>

          <img class="ui avatar image" src="/images/avatar2/small/lena.png"/>
          <div class="content">
            Lena
          </div>

        </div>
      )
  }


}
export default Task;