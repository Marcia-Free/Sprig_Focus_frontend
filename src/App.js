import React from 'react'
import './App.css';

import Home from './components/Home'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Goals from './components/Goals'

import {Route, Switch} from 'react-router-dom'

function App() {
  return (
    <div className='App'>
        <Switch>
          <Route exact path ={'/'} component={Home} />
          <Route exact path={'/signup'} component={SignUp} />
          <Route exact path = {'/signin'} component={SignIn} />
          <Route exact path = {'/goals'} component={Goals} />

          {/* <Route exact path = {'/sprig'} component={Sprig} />
          <Route exact path = {'/goals/calendar'} component={GoalCalendar} /> */}
        </Switch>
    </div>
  );
}

export default App;
