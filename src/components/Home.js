  import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import logo from '../images/sprig logo.png'

import FormSection from './LoginFormSection'

import SignUp from './SignUp'
import Login from './Login'

function Home(props) {

    const [user, setUser] = useState({})
    const [form, setForm] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(token){
          fetch(`http://localhost:3001/api/v1/auto_login`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(resp => resp.json())
          .then(data => {
            setUser(data)
            // console.log(data)
          })
        }
      }, [])
    

      const handleAuthClick = () => {
        const token = localStorage.getItem("token")
        fetch(`http://localhost:3001/user_is_authed`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
        .then(data => props.history.push(`/goals`))
      }


      const handleLogin = (user) => {
        setUser(user)
      }
    
      const handleFormSwitch = (input) => {
        setForm(input)
      }

      const renderForm = () => {
        switch(form){
          case "login":
            return <Login handleLogin={handleLogin}/>
            break;
          default:
            return <SignUp handleLogin={handleLogin}/>
        }
      }
      


    console.log(user)

    return (
        <div className='Home'>
            
            <div className="ui divider">
                
                <button onClick={handleAuthClick} className="ui button">Access Authorized Route</button>
            </div>

            <div>
                <h1>Sprig Goals</h1>
                <img className="ui large centered circular image" src={logo}></img>
            </div>



            <div className="ui placeholder segment">
                <FormSection handleFormSwitch={handleFormSwitch}/>
                    <div className="ui segment">
                        {renderForm()}
                    </div>
            </div>


        </div>
    );


}
export default Home;