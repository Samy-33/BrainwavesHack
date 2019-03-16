import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Contests from './contests'

const ContestsRoutes = (props) => {
  return (
    <Switch>
      <Route path='/contests' component={Contests} />
    </Switch>
  )
}

export default ContestsRoutes