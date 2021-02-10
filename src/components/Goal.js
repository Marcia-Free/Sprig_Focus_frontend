import React from 'react'
import { Link , Redirect} from "react-router-dom";
import NavBar from './NavBar'
import Footer from './Footer'
import VirtualPet from './VirtualPet'

import logo from '../images/sprig logo.png'

class Goal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { goal: { tasks: [] } };

          this.handleDelete = this.handleDelete.bind(this);
          this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        const {
            match: {
              params: { id }
            }
          } = this.props;
      
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
        const {
            match: {
              params: { id }
            }
        } = this.props;

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

    handleUpdate() {
        const {
            match: {
              params: { id }
            }
        } = this.props;
        
    }


render() {
        const { goal } = this.state;
        let taskList = "No tasks created yet";

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

            <div className="ButtonColumn sixteen wide column">
                <button className="ui orange labeled icon button" onClick={this.handleUpdate}>
                    <i className="columns icon"></i>
                    Update Goal
                </button>
                <button className="ui orange right labeled icon button"  onClick={this.handleDelete}>
                    <i className="sticky note icon"></i>
                    Delete Goal
                </button>
            </div>
  

            <div className="ui two column centered grid">

                <div className="six wide green column">test</div>
                <div className="eight wide olive column">
                    <div className="ui segments">
                            <a className="ui small image"> <img src={logo}/> </a>

                            <div className="ui segment">
                                <h2 class="ui header">
                                    <i class="ui circular olive right floated button">Complete</i>
                                    <div class="content"> {goal.name} </div>
                                </h2>
                            </div>
                            <div className='ui secondary segment'>
                                <div className="ui divider">Info</div>
                                <div className="description"> <p>{goal.info}</p> </div>
                            
                            
                                <a className="header"> <h3>Tasks</h3> </a>
                                <div className="ui divider"></div>
                                {taskList}
                            </div> 
                    </div>
                </div>
            </div>

            


        <Footer />
        </div>
    );
  }


}
export default Goal;