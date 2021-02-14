import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/sprig logo.png'


const Login = (props) => {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         username: "",
  //         password: "",
  //     };
  //     this.onChange = this.onChange.bind(this);
  //     this.onSubmit = this.onSubmit.bind(this);
  // }

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


//   onChange = (event) => {
//     this.setState({ 
//         [event.target.name]: event.target.value    
//     });
// }

const handleUsernameChange = (evt) => {
  setUsername(evt.target.value)
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
  //     'Content-Type': 'application/json',
  //     "Accept": "application/json"
  //   },
  //   body:  JSON.stringify(newGoal)
  // }
  // //------------------------------
  // fetch(url, reqObj)
  // .then(resp => resp.json())
  // .then(data => {
  //     localStorage.setItem("token", data.jwt)
  //     this.props.handleLogin(data.user)
  //     this.props.history.push(`/goals`)
  // })

      // .then(response => {
      // if (response.ok) {
      //     return response.json();
      // }
      // throw new Error("Network response was not ok.");
      // })
      // .then(response => this.props.history.push(`/goals`))
      // .catch(error => console.log(error.message));
  // }

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "http://localhost:3001/login";
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
        props.history.push(`/goals`)
    })
    setUsername("")
    setPassword("")
  }
  
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
                <i class="lock icon"></i>
                {/* <input type="password" name="password" placeholder="Password" onChange={this.onChange}/> */}
                <input type="password" name="password" value={password} placeholder="Password" onChange={handlePasswordChange}/>

              </div>
            </div>

          <div class="ui fluid large yellow submit button">Login</div>
            <div class="ui error message"></div>
          </form>

        </div>
      </div> 
  </div>

  );
  }



export default Login;