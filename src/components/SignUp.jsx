import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/sprig logo.png'


class SignUp extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          username: "",
          email: "",
          password: "",
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
  const url = "http://localhost:3001/api/v1/users";
  const newGoal = {...this.state}
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
      .then(response => this.props.history.push(`/goals`))
      .catch(error => console.log(error.message));
  }


render() {
  return (

  <div className='SignUp'>

    <h2 className="ui yellow image header">
      <img src={logo} className="image"/>
        <div className="content">
        Create a new Account
        </div>
    </h2>

      <div className="ui two column centered grid">
        <div className="twelve wide column">
          
          <form className="ui form" onSubmit={this.onSubmit}>

            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="username" placeholder="Username" onChange={this.onChange}/>
              </div>
            </div>

            <div class="field">
              <div class="ui left icon input">
                <i class="envelope icon"></i>
                <input type="text" name="email" placeholder="E-mail address" onChange={this.onChange}/>
              </div>
            </div>

            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="Password" onChange={this.onChange}/>
              </div>
            </div>

            <div class="ui fluid large yellow submit button">Create Account</div>
            <div class="ui error message"></div>
          </form>

        </div>
      </div> 
  </div>

  );
  }


  }
export default SignUp;