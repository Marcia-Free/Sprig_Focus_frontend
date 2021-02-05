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

            <div>
                <h1>Goal Page</h1>
            </div>

        <VirtualPet />


        <Footer />
        </div>
    );
  }


}
export default Goals;