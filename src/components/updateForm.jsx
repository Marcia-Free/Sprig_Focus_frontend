import React from 'react'
import { Link } from "react-router-dom";

import logo from '../images/sprig logo.png'

class updateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { goal: { tasks: [] }
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount() {
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
          .catch(() => this.props.history.push(`/goals/${id}`));
      }

    onChange = (event) => {
        this.setState({ 
            goal: {...this.state.goal, [event.target.name]: event.target.value }   
            
        });

    }

    onSubmit(event) {
    event.preventDefault();

    const { match: {params: { id }}} = this.props;
    const url = `http://localhost:3001/goals/${id}`;
    const updatedGoal = {...this.state}
    //-----------------------
    const reqObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(updatedGoal)
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
    }




render() {      
    const { goal } = this.state;
    const goalTasks = goal.tasks;

    let taskList = "No tasks created yet";

    const allTasks =  goalTasks.map((task, index) => (
        <div className='Task item'>

        <i className="right triangle icon"></i>

          <div className="content">
            <div className="header">{task.name}</div>
            <div className="description">{task.description}</div>
          </div>

          <div class="ui small right floated icon buttons">
            {/* <button class="ui button"><i class="red eraser icon"></i></button>
            <button class="ui button"><i class="black edit icon"></i></button> */}
          </div>

      </div>
        ))



    return (

        
        
        <div className='Goal'>

            <form className="ui form" onSubmit={this.onSubmit} >
                
                <div className="Main ui centered grid">

                    <div className="ten wide column">
                    <div className='GoalCard ui fluid card'>
                    {goal.imageurl ? <img className="GoalImage ui image" src={goal.imageurl}></img> : null }

                                <div className="ui segment">
                                    <h3 class="ui header">
                                        <div className="field">
                                            <label >Name</label>
                                            <input type="text" name="name" value={this.state.goal.name} onChange={this.onChange}/>
                                        </div>
                                    </h3>
                                </div>

                                <div className='ui horizontal segments'>
                                    <div className='ui segment'>
                                        <div className="field">
                                            <i class="calendar outline icon"></i><label className='ui grey header'>Date </label>
                                            <input type="date" name="date" value={this.state.goal.date} onChange={this.onChange}/>
                                        </div>
                                    </div>

                                    <div className='ui segment'>
                                        <div className="field">
                                            <i class="clock outline icon"></i><label className='ui grey header'>Time </label>
                                            <input type="time" name="time" value={this.state.goal.time} onChange={this.onChange}/>
                                        </div>
                                    </div>
                                </div>

                                <div className='ui secondary segment'>
                                    <div className="ui header">Info</div>
                                        <div className="field">
                                            <textarea rows="4" name="info" value={this.state.goal.info} onChange={this.onChange}/>
                                        </div>

                                    <div className="field">
                                        <label className='ui grey header'>Image</label>
                                        <input type="text" name="imageurl" value={this.state.goal.imageurl} onChange={this.onChange}/>
                                    </div>

                                    <div class="two ui buttons">
                                        <button className="ui fluid submit button" type="submit">Update Goal</button>
                                        <Link className="ui fluid red submit button" to={`/goals/${this.state.goal.id}`}>Go Back</Link>
                                    </div>

                                    <div class="ui error message"></div>
                                
                                    <div className="ui divider"></div>
                                    <div className="header"> <h3>Tasks</h3> </div>

                                    <div className= 'ui middle aligned divided list'>
                                    {goal.tasks.length > 0 ? allTasks : taskList}
                                  </div>
                                </div> 
                        </div>
                    </div>
                </div>
            
            </form>



</div>


    );
  }


}
export default updateForm;