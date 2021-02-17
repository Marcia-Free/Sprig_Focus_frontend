import React from 'react'
import { Link } from "react-router-dom";

import { connect } from 'react-redux'
import { currentUser } from '../actions/auth'

import logo from '../images/sprig logo.png'

class newForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            info: "",
            date: "",
            time: "",
            completed: false,
            user_id: 0,
            tag_id: 0
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onChange = (event) => {
        this.setState({ 
            [event.target.name]: event.target.value    
        });
    }

    onSubmit(event) {
    event.preventDefault();
    const url = "http://localhost:3001/goals";
    const newGoal = {...this.state, user_id: this.props.currentUser.id}
    //-----------------------
    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(newGoal)
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
    return (
        
        <div className='Goals'>


        <div className= 'ui Main fluid Form card'>
        <h1 className="ui grey header">What will you accomplish today?</h1>
            <div className="ui two column centered grid">
                <div className="twelve wide column">

                    <form className="ui form" onSubmit={this.onSubmit} >
                        
                        <div className="field">
                            <label>Name</label>
                            <input type="text" name="name" placeholder="Goal Name" onChange={this.onChange}/>
                        </div>

                        <div className="field">
                            <label>Info</label>
                            <textarea rows="3" name="info" placeholder="Description" onChange={this.onChange}/>
                        </div>

                        <div className="fields">
                            <div className="field">
                            <label>Date</label>
                            <input type="date" name="date" onChange={this.onChange}/>
                            </div>
                            
                            <div className="field">
                            <label>Time</label>
                            <input type="time" name="time" onChange={this.onChange}/>
                            </div>
                        </div>

                        <div class="two ui buttons">
                            <button className="ui fluid submit button" type="submit">Add Goal</button>
                            <Link className="ui fluid red submit button" to={`/goals`}>Go Back</Link>
                        </div>

                        
                        <div class="ui error message"></div>
                        
                    </form>
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

export default connect(mapStateToProps)(newForm);