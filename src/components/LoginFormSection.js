import React from 'react'

// const headerStyle = {
//     background: "black",
//     height: "15vh",
//     // lineHeight: "15vh"
// }


function LoginFormSection(props){
    return(
        // <div style={headerStyle}>
        <div class="ui two column centered grid">

            <div class="four wide column">
                <button className="ui fluid button" onClick={() => props.handleFormSwitch("signUp")}>Sign Up</button>
                {/* <Link to='/signup'> <button className="ui yellow large button">New User</button></Link>   */}
            </div>
            <div class="four wide column">
                <button className="ui fluid button" onClick={() => props.handleFormSwitch("login")}>Log In</button>
                {/* <Link to='/login'><button className="ui yellow large button">Existing User</button></Link> */}
            </div>
        </div>
   
    )
}

export default LoginFormSection;