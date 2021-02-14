import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/sprig logo.png'


const SignUp = (props) => {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         username: "",
  //         email: "",
  //         password: "",
  //     };
  //     this.onChange = this.onChange.bind(this);
  //     this.onSubmit = this.onSubmit.bind(this);
  // }
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

//   onChange = (event) => {
//     this.setState({ 
//         [event.target.name]: event.target.value    
//     });
// }

const handleUsernameChange = (evt) => {
  setUsername(evt.target.value)
}

const handleEmailChange = (evt) => {
  setEmail(evt.target.value)
}

const handlePasswordChange = (evt) => {
  setPassword(evt.target.value)
}


  // onSubmit(event) {
  // event.preventDefault();
  // const url = "http://localhost:3001/api/v1/users";
  // const newGoal = {...this.state}
  // //-----------------------
  // const reqObj = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body:  JSON.stringify(newGoal)
  // }
  // //------------------------------
  // fetch(url, reqObj)
  //     .then(response => {
  //     if (response.ok) {
  //         return response.json();
  //     }
  //     throw new Error("Network response was not ok.");
  //     })
  //     .then(response => this.props.history.push(`/goals`))
  //     .catch(error => console.log(error.message));
  // }

 const  onSubmit = (event) => {
    event.preventDefault();
    const url = "http://localhost:3001/users";
    const newGoal = {...this.state}
    //-----------------------
    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
      },
      body:  JSON.stringify(newGoal)
    }
    //------------------------------
    fetch(url, reqObj)
    .then(resp => resp.json())
    .then(data => {
        localStorage.setItem("token", data.jwt)
        props.handleLogin(data.user)
        .then(response => props.history.push(`/goals`))
        // .catch(error => console.log(error.message));
    })
    setUsername("")
    setEmail("")
    setPassword("")
    }


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
          
          {/* <form className="ui form" onSubmit={this.onSubmit}> */}
          <form className="ui form" onSubmit={onSubmit}>


            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                {/* <input type="text" name="username" placeholder="Username" onChange={this.onChange}/> */}
                <input type="text" name="username" value={username} placeholder="Username" onChange={handleUsernameChange}/>

              </div>
            </div>

            <div class="field">
              <div class="ui left icon input">
                <i class="envelope icon"></i>
                {/* <input type="text" name="email" placeholder="E-mail address" onChange={this.onChange}/> */}
                <input type="text" name="email" value={email} placeholder="E-mail address" onChange={handleEmailChange}/>
              
              </div>
            </div>

            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                {/* <input type="password" name="password" placeholder="Password" onChange={this.onChange}/> */}
                <input type="text" name="password" value={password} placeholder="Password" onChange={handlePasswordChange}/>

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

export default SignUp;