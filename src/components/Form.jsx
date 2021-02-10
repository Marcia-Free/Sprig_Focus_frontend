import React from 'react'
import { Link } from "react-router-dom";
import NavBar from './NavBar'
import Footer from './Footer'
// import VirtualPet from './VirtualPet'

import logo from '../images/sprig logo.png'

class Form extends React.Component {
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
        // this.stripHtmlEntities = this.stripHtmlEntities.bind(this);

    }


    onChange = (event) => {
        this.setState({ 
            [event.target.name]: event.target.value    
        });
    }


    onSubmit(event) {
    event.preventDefault();
    const url = "http://localhost:3001/api/v1/goals";
    const newGoal = {...this.state, completed: false}
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
        <NavBar />

                <h1>What will you accomplish today?</h1>

            <div className="ButtonColumn sixteen wide column">
                <button className="ui orange labeled icon button">
                    <i className="columns icon"></i>
                    Update Goal
                </button>
                <button className="ui orange right labeled icon button">
                    <i className="sticky note icon"></i>
                    Delete Goal
                </button>
            </div>


            <div className="ui two column centered grid">
                <div className="ten wide olive column">
                    <form className="ui form" onSubmit={this.onSubmit} >
                        <div className="field">
                            <label>Name</label>
                            <input type="text" name="name" onChange={this.onChange}/>
                        </div>

                        <div className="field">
                            <label>Info</label>
                            <textarea rows="3" name="info" onChange={this.onChange}/>
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

                        <button className="ui button" type="submit">Add Goal</button>
                    </form>
                </div>
            </div>

            


        <Footer />
        </div>
    );
  }


}
export default Form;