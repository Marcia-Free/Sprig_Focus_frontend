import React from 'react'
import {Route, Switch} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';

import './components/Theme.css';

import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Goals from './components/Goals'
import Goal from './components/Goal'
import Complete from './components/Complete'

import newForm from './components/newForm'
import newTaskForm from './components/newTaskForm'
import updateForm from './components/updateForm'
import updateTaskForm from './components/updateTaskForm'



function App() {


  return (

    <BrowserRouter>
      <div className='App'>
          <Switch>
            <Route exact path ={'/'} component={Home} />
            <Route exact path={'/signup'} component={SignUp} />
            <Route exact path = {'/login'} component={Login} />
            {/* <Route exact path = {'/goals'} component={Goals} /> */}
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
    </BrowserRouter>
  );
}

export default App;
