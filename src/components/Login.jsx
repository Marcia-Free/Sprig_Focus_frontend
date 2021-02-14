import React from 'react';
import { Link , withRouter} from "react-router-dom";
import { connect } from 'react-redux'
import { loginSuccess } from '../actions/auth'

import logo from '../images/sprig logo.png'


class Login extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          username: "",
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
  const url = "http://localhost:3001//auth";
  const newUser = {...this.state}
  //-----------------------
  const reqObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:  JSON.stringify(newUser)
  }
  //------------------------------
  fetch(url, reqObj)
  .then(resp => resp.json())
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



  render() {
    return (

    <div className='Login'>

      <h2 className="ui yellow image header">
        <img src={logo} className="image"/>
          <div className="content">
          Welcome Back!
          </div>
      </h2>

        <div className="ui two column centered grid">
          <div className="twelve wide column">
            
            <form className="ui form" onSubmit={this.onSubmit}>

              <div class="field">
                <div class="ui left icon input">
                  <i class="user icon"></i>
                  <input type="text" name="username" placeholder="Username" onChange={this.onChange} value={this.state.username}/>
                </div>
              </div>

              <div class="field">
                <div class="ui left icon input">
                  <i class="lock icon"></i>
                  <input type="password" name="password" placeholder="Password" onChange={this.onChange} value={this.state.password}/>
                </div>
              </div>

            <input type='submit' class="ui fluid large yellow submit button" value='login'></input>
              <div class="ui error message">
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


export default withRouter(connect(null, mapDispatchToProps)(Login))