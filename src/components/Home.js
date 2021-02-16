import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import TitleImage from '../images/1837.jpeg'

import FormSection from './LoginFormSection'

import SignUp from './SignUp'
import Login from './Login'

const  Home = (props) => {

    const [user, setUser] = useState({})
    const [form, setForm] = useState("")
    

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
      

    return (
        <div className='Home'>

            

            <div className="TitleContainer">
                {/* <img className="ui large centered circular image" src={logo}></img> */}
                {/* <img className="HomeImage ui centered image" src=' https://i.imgur.com/am0eYJO.gif'></img> */}
                <img className="HomeImage ui centered image" src={TitleImage}></img>

                  <h1 className="TitleText">Sprig Goals</h1>
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