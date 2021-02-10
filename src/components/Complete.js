import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import VirtualPet from './VirtualPet'

class Complete extends React.Component {

    




render() {
    return (
        
        
        <div className='Complete'>
        <NavBar />

                <h1>Completed Tasks</h1>
                <VirtualPet />

            <div className="ui two column centered grid">
                <div className="sixteen wide black column"> Placeholder!</div>
                <div className="four column centered row">test</div>
                <div className="six wide green column">test</div>
                <div className="ten wide olive column">test</div>
            </div>

            


        <Footer />
        </div>
    );
  }


}
export default Complete;