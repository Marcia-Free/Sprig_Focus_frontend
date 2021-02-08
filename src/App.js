import React from 'react'
import './components/Theme.css';

import Home from './components/Home'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Focus from './components/Focus'

import {Route, Switch} from 'react-router-dom'

function App() {
  return (
    <div className='App'>
        <Switch>
          <Route exact path ={'/'} component={Home} />
          <Route exact path={'/signup'} component={SignUp} />
          <Route exact path = {'/signin'} component={SignIn} />
          <Route exact path = {'/focus'} component={Focus} />
          {/* <Route exact path = {'/completed'} component={Complete} /> */}
        </Switch>
    </div>
  );
}

export default App;
