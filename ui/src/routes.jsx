import React from 'react'
import { Switch, Route } from "react-router-dom"
import Home from './home/home'
import Login from './auth/login'
import Logout from './auth/logout'
import Signup from './auth/signup'
import CriteriaFilter from './criteria-filter/criteria'


export default class Routes extends React.Component {
  render () {
    return (
      <Switch>
        <Route exact path={["", "/"]} component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/signup" component={Signup} />
        <Route path="/criteria" component={CriteriaFilter} />
        {/* <Route path="/contests" component={ContestsRoutes} />
        <Route path="/practice" component="" />
        <Route path="/resources" component="" /> */}
      </Switch>
    )
  }
}