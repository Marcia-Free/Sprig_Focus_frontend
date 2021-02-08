import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/sprig logo.png'

class Home extends React.Component {




render() {
    return (
        <div className='Home'>
            <div className="ui top attached menu">
            </div>
            <div class="ui divider">
            </div>

            <div>
                <h1>Sprig Goals</h1>
                <img class="ui big centered circular image" src={logo}></img>
            </div>



            <div class="ui placeholder segment">
                <div class="ui two column stackable center aligned grid">
                    <div class="ui vertical divider">Or</div>

                    <div class="column">
                        <i class="huge orange user plus icon"></i>
                        <Link to='/signup'> <button className="ui yellow large button">New User</button></Link>  
                    </div>
                    <div class="column">
                        <i class="huge orange users icon"></i>
                        <Link to='/signin'><button className="ui yellow large button">Existing User</button></Link>
                    </div>

                </div>
                
            </div>
            <div class="ui bottom attached segment">
                <p>Placeholder inc</p>
            </div>


        </div>
    );
  }


}
export default Home;