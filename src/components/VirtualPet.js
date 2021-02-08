// import React from 'react'
import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'

let container;



class VirtualPet extends React.Component {
    
render() {

    return (
        <div className='VirtualPet' >
            {/* {this.setCanvas()} */}
        </div>
    );
  }

    setCanvas() {
        let canvas = document.getElementsByClassName('VirtualPet')
        let test = document.querySelector('#test')

        canvas.append( container );

    }


   

}
export default VirtualPet;