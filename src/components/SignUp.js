import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/sprig logo.png'
// import { loginSuccess } from '../actions/auth'


class SignUp extends React.Component {
    // state = {
    //     username: '',
    //     password: '',
    //     error: ''
    //   }

    //   handleInputChange = (e) => { 
    //     this.setState({
    //       [e.target.name]: e.target.value
    //     })
    //   }

    //   handleSubmit = (e) => {
    //     e.preventDefault()
    
    //     const reqObj = {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body:  JSON.stringify(this.state)
    //     }
    //     fetch('http://localhost:3000/api/v1/auth', reqObj)
    //     .then(resp => resp.json())
    //     .then(data => {
    //       if (data.error){
    //         this.setState({
    //           error: data.error
    //         })
    //       } else {
    //         localStorage.setItem('jwt_token', data.token)
    
    
    //         this.props.loginSuccess(data.user)
    //         this.props.history.push('/dashboard')
    //       }
    //     })
    //   }



render() {
    return (
        <div className='Form'>
            <div>
                <h1>Sign Up</h1>
            </div>
            

<div class="ui middle aligned center aligned grid">
  <div class="column">
    <h2 class="ui yellow image header">
      <img src={logo} class="image"/>
      <div class="content">
        Log-in to your account
      </div>
    </h2>
    <form class="ui large form">
      <div class="ui stacked segment">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text" name="email" placeholder="E-mail address"/>
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" name="password" placeholder="Password"/>
          </div>
        </div>
        <Link to='/focus'><div class="ui fluid large yellow submit button">Login</div></Link>
      </div>

      <div class="ui error message"></div>
    </form>

  </div>
</div>




        </div>
    );
  }


}
export default SignUp;