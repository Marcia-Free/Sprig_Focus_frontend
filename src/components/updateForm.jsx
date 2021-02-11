import React from 'react'
import { Link } from "react-router-dom";
import NavBar from './NavBar'
import Footer from './Footer'
import VirtualPet from './VirtualPet'

import logo from '../images/sprig logo.png'

class updateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { goal: { tasks: [] }
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // this.stripHtmlEntities = this.stripHtmlEntities.bind(this);

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
    return (
        
        <div className='Goals'>
        <NavBar />

        <VirtualPet />

            <form className="ui form" onSubmit={this.onSubmit} >
                
                <div className="ui two column centered grid">

                    <div className="six wide grey column">Placeholder</div>

                    <div className="eight wide olive column">
                        <div className="ui segments">
                            <a className="ui small image"> <img src={logo}/> </a>

                                <div className="ui olive segment">
                                    <h3 class="ui header">
                                        <div className="field">
                                            <label>Name</label>
                                            <input type="text" name="name" placeholder={this.state.goal.name} onChange={this.onChange}/>
                                        </div>
                                    </h3>
                                </div>

                                <div className='ui olive segment'>
                                    <div className="field">
                                        <i class="calendar outline icon"></i><label>Date </label>
                                        <input type="date" name="date" placeholder={this.state.goal.date} onChange={this.onChange}/>
                                    </div>
                                
                                    <div className="field">
                                        <i class="clock outline icon"></i><label>Time </label>
                                        <input type="time" name="time" placeholder={this.state.goal.time} onChange={this.onChange}/>
                                    </div>
                                </div>

                                <div className='ui secondary olive segment'>
                                    <div className="ui header">Info</div>
                                        <div className="field">
                                        <textarea rows="4" name="info" placeholder={this.state.goal.info} onChange={this.onChange}/>
                                        </div>

                                    <button className="ui fluid large yellow submit button" type="submit">Update Goal</button>
                                    <Link to={`/goals/${this.state.goal.id}`}><button className="ui fluid large red submit button">Go Back</button></Link>
                                    <div class="ui error message"></div>
                                
                                    <div className="ui divider"></div>
                                    <a className="header"> <h3>Tasks</h3> </a>
                                    <div className="ui divider"></div>

                                    {/* {taskList} */}
                                </div> 
                        </div>
                    </div>
                </div>
            
            </form>




<Footer />
</div>


    );
  }


}
export default updateForm;