import React from 'react'
import { Link } from "react-router-dom";
import NavBar from './NavBar'
import Footer from './Footer'

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
        
          const url = `http://localhost:3001/api/v1/goals/${id}`;
  
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
    const url = `http://localhost:3001/api/v1/goals/${id}`;
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
            <button class="ui button"><i class="red eraser icon"></i></button>
            <button class="ui button"><i class="black edit icon"></i></button>
          </div>

      </div>
        ))



    return (

        
        
        <div className='Goals'>
        <NavBar />


            <form className="ui form" onSubmit={this.onSubmit} >
                
                <div className="ui centered grid">

                    <div className=" Main ten wide column">
                        <div className="ui segments">
                            <a className="ui small image"> <img src={logo}/> </a>

                                <div className="ui olive segment">
                                    <h3 class="ui header">
                                        <div className="field">
                                            <label>Name</label>
                                            <input type="text" name="name" value={this.state.goal.name} onChange={this.onChange}/>
                                        </div>
                                    </h3>
                                </div>

                                <div className='ui horizontal segments'>
                                    <div className='ui olive segment'>
                                        <div className="field">
                                            <i class="calendar outline icon"></i><label>Date </label>
                                            <input type="date" name="date" value={this.state.goal.date} onChange={this.onChange}/>
                                        </div>
                                    </div>

                                    <div className='ui olive segment'>
                                        <div className="field">
                                            <i class="clock outline icon"></i><label>Time </label>
                                            <input type="time" name="time" value={this.state.goal.time} onChange={this.onChange}/>
                                        </div>
                                    </div>
                                </div>

                                <div className='ui secondary olive segment'>
                                    <div className="ui header">Info</div>
                                        <div className="field">
                                            <textarea rows="4" name="info" value={this.state.goal.info} onChange={this.onChange}/>
                                        </div>

                                    <div class="two ui buttons">
                                        <button className="ui fluid large yellow submit button" type="submit">Update Goal</button>
                                        <Link to={`/goals/${this.state.goal.id}`}>
                                            <button className="ui fluid large red submit button">Go Back
                                            </button></Link>
                                    </div>

                                    <div class="ui error message"></div>
                                
                                    <div className="ui divider"></div>
                                    <a className="header"> <h3>Tasks</h3> </a>

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