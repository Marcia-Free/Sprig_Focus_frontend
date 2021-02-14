import React from 'react'
import {Route, Switch} from 'react-router-dom'

import './components/Theme.css';

import Home from './components/Home'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Goals from './components/Goals'
import Goal from './components/Goal'
import Complete from './components/Complete'

import newForm from './components/newForm'
import newTaskForm from './components/newTaskForm'
import updateForm from './components/updateForm'
import updateTaskForm from './components/updateTaskForm'



function App() {
  return (
    <div className='App'>
        <Switch>
          <Route exact path ={'/'} component={Home} />
          <Route exact path={'/signup'} component={SignUp} />
          <Route exact path = {'/signin'} component={SignIn} />
          <Route exact path = {'/goals'} component={Goals} />
          <Route exact path = {'/completed'} component={Complete} />

          <Route exact path = {'/goals/:id'} component={Goal} />
          <Route exact path = {'/new'} component={newForm} />
          <Route exact path = {'/goals/:id/edit'} component={updateForm} />

          {/* <Route exact path = {'/tasks/:id'} component={Task} /> */}
          <Route exact path = {'/tasks/new'} component={newTaskForm} />
          <Route exact path = {'/tasks/:id/edit'} component={updateTaskForm} />
        </Switch>
    </div>
  );
}

export default App;
