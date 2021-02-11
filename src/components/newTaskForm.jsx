import React from 'react'
import { Link } from "react-router-dom";
import NavBar from './NavBar'
import Footer from './Footer'


class newTaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            completed: false,
            goal_id: 0,
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
    const url = "http://localhost:3001/api/v1/tasks";
    const newTask = {...this.state}
    //-----------------------
    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(newTask)
    }
    //------------------------------
    fetch(url, reqObj)
        .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Network response was not ok.");
        })
        .then(response => this.props.history.push(`/tasks/${response.id}`))
        .catch(error => console.log(error.message));
    }



render() {      
    return (
        
        <div className='Goals'>
        <NavBar />

                <h1 className="ui yellow image header">What will you accomplish today?</h1>


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

                        <button className="ui fluid large yellow submit button" type="submit">Add Goal</button>
                        <div class="ui error message"></div>
                        
                    </form>
                </div>
            </div>

            
        </div>
    );
  }


}
export default newTaskForm;