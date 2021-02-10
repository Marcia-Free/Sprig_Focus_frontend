import React from 'react'
import logo from '../images/sprig logo.png'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {




render() {
    return (
        <div className='NavBar'>
            <div className="ui top attached menu">

                <div className="ui dropdown icon item">
                    <img className="ui mini circular image" src={logo}/>
                    <i className="dropdown icon"></i>
                </div>


                <a className="item">Welcome, User</a>
                <a className="item"><Link to='/goals'>Goals</Link></a>
                <a className="item"><Link to='/completed'>Completed</Link></a>


                <div class="right menu">
                    <div class="item">
                        <div class="ui icon input">
                            <input type="text" placeholder="Search..."/>
                            <i class="search link icon"></i>
                        </div>
                    </div>
                        <a class="ui item"><Link to='/'>Sign Out</Link></a>
                </div>

            </div>
            <div className="ui divider">
            </div>

        </div>
    );
  }


}
export default NavBar;