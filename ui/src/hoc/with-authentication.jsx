import _ from 'lodash'
import React from 'react'
import { Redirect } from 'react-router-dom'
import store from '../config/store'
import { LOGIN_ROUTE } from '../config/constants'
import Alert from 'react-s-alert'

export const withAuthentication = (WrappedComponent) => {
  return () => {
    const userLoggedIn = _.get(store.getState(), 'auth.userLoggedIn')
    if(userLoggedIn) return <WrappedComponent/>

    Alert.error('You need to log in to access the page.')
    return <Redirect to={LOGIN_ROUTE}/>
  }
}