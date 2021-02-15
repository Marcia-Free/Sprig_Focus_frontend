import React, {useState} from 'react'
import { Link , withRouter} from "react-router-dom";
import { connect } from 'react-redux'
import { loginSuccess } from '../actions/auth'

import logo from '../images/sprig logo.png'


class SignUp extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          username: "",
          email: "",
          password: "",
          error: ""
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
  const url = "http://localhost:3001/signup";
  const newUser = {...this.state}
  //-----------------------
  const reqObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify(newUser)
  }
  //------------------------------
  fetch(url, reqObj)
    .then(resp => {
      if (resp.ok) {
          return resp.json();
      }
      throw new Error("Network response was not ok.");
      })
    .then(data => {
      if (data.error){
        this.setState({
          error: data.error
        })
      } else {
        this.props.loginSuccess(data)
        this.props.history.push('/goals')
      }
    })
  }

//   fetch(url, reqObj)
//   .then(resp => resp.json())
//   .then(data => {
//     if (data.error){
//       this.setState({
//         error: data.error
//       })
//     } else {
//       this.props.loginSuccess(data)
//       this.props.history.push('/goals')
//     }
//   })
// }


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


              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input type="text" name="username" placeholder="Username" onChange={this.onChange}/>
                </div>
              </div>

              <div className="field">
                <div className="ui left icon input">
                  <i className="envelope icon"></i>
                  <input type="text" name="email" placeholder="E-mail address" onChange={this.onChange}/>                
                </div>
              </div>

              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input type="password" name="password" placeholder="Password" onChange={this.onChange}/>
                </div>
              </div>

              <input type='submit' className="ui fluid large yellow submit button" value='Create Account'></input>
              <div className="ui error message">
              {this.state.error ? <h4 style={{color: 'red'}}>{this.state.error}</h4> : null}
              </div>
            </form>

          </div>
        </div> 
    </div>

    );
    }
}


const mapDispatchToProps = {
  loginSuccess: loginSuccess
}

export default  withRouter(connect(null, mapDispatchToProps)(SignUp));