import React from 'react'
import placeholderAvatar from '../images/sprig logo.png'
import avatar from '../images/girl.png'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/auth'

class NavBar extends React.Component {

    handleClick = () => {
        this.props.logoutUser()
      }

render() {

    return (
 
        
        <div className='NavBar'>

            {
            this.props.currentUser 
            ? 
                <div className="ui mini menu">

                    <div className="ui dropdown icon item">
                        {/* <img className="ui mini circular image" src={this.props.currentUser.avatar}/> */}
                        <img className="ui mini circular image" src={avatar}/>

                        <i className="dropdown icon"></i>
                    </div>


                    <p className=" ui header item">Welcome {this.props.currentUser.username}</p>
                        <div className="ui buttons">
                            <Link className="ui button item" to='/goals'>Goals</Link>
                            <Link className="ui button item" to='/completed'>Completed</Link>
                        </div>


                    <div class="right menu">
                        {/* <div class="item">
                            <div class="ui icon input">
                                <input type="text" placeholder="Search..."/>
                                <i class="search link icon"></i>
                            </div>
                        </div> */}

                        <Link className="ui button item" to='/home' onClick={this.handleClick}>Log Out</Link>
                    </div>

                </div>

            : 

                <div className="ui mini menu">

                    <div className="ui icon item">
                        <img className="ui mini circular image" src={placeholderAvatar}/>
                        {/* <i className="dropdown icon"></i> */}
                    </div>


                        <p className=" ui header item">Welcome</p>
                        <div className="ui buttons">
                            <Link className="ui disabled button item" to='/goals'>Goals</Link>
                            <Link className="ui disabled button item" to='/completed'>Completed</Link>
                        </div>


                    <div class="right menu">
                        {/* <div class="item">
                            <div class="ui icon input">
                                <input type="text" placeholder="Search..."/>
                                <i class="search link icon"></i>
                            </div>
                        </div> */}

                        <Link className="ui button item" to='/home'>Log In</Link>

                    </div>
                </div>

            }




        </div>
    );
  }

}

const mapStateToProps = (state) => {
    return {
      currentUser: state.currentUser
    }
  }
  
  const mapDispatchToProps = {
    logoutUser: logoutUser
  }

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);