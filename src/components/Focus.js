import React from 'react'
import logo from '../images/logo.png'
import NavBar from './NavBar'
import Footer from './Footer'
import VirtualPet from './VirtualPet'

class Goals extends React.Component {

    




render() {
    return (
        
        
        <div className='Goals'>
        <NavBar />

                <h1>Goal Page</h1>

            <div className="ui two column centered grid">
                <div className="sixteen wide black column"> Placeholder!</div>
                {/* <div className="four column centered row"></div> */}
                <div className="six wide green column">test</div>
                <div className="ten wide olive column">test</div>
            </div>

            <VirtualPet />


        <Footer />
        </div>
    );
  }


}
export default Goals;