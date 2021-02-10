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

  <div className='SignUp' >

    <h1>Sign Up</h1>
    <h2 className="ui yellow image header">
      <img src={logo} className="image"/>
        <div className="content">
        Log-in to your account
        </div>
    </h2>

      <div className="ui two column centered grid">
        <div className="twelve wide column">
          <form className="ui form">

            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="username" placeholder="Username"/>
              </div>
            </div>

            <div class="field">
              <div class="ui left icon input">
                <i class="envelope icon"></i>
                <input type="text" name="email" placeholder="E-mail address"/>
              </div>
            </div>

            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="Password"/>
              </div>
            </div>

            <Link to='/goals'><div class="ui fluid large yellow submit button">Login</div></Link>
            <div class="ui error message"></div>
          </form>

        </div>
      </div> 
  </div>

  );
  }


  }
export default SignUp;