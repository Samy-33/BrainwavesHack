import _ from 'lodash'
import {
  AUTH_TOKEN_KEY,
  USER_LOGIN_FAILURE, USER_LOGIN_PENDING, USER_LOGIN_SUCCESS,
  TOKEN_VALIDATION_FAILURE, TOKEN_VALIDATION_PENDING, TOKEN_VALIDATION_SUCCESS,
  USER_LOGOUT_FAILURE, USER_LOGOUT_PENDING, USER_LOGOUT_SUCCESS,
  USER_SIGNUP_PENDING, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILURE
} from '../config/constants'

const initialState = {
  authLoading: false,
  validatingToken: true,
  loginErrs: {},
  signupErrs: {},
  userLoggedIn: null,
  userToken: null,
  user: null
}

export const authReducer = (state=initialState, action) => {
  if (_.isEmpty(state)) return {...initialState}

  switch(action.type) {

    case USER_LOGIN_PENDING: {
      return {
        ...state,
        authLoading: true
      }
    }

    case TOKEN_VALIDATION_PENDING: {
      return {
        ...state,
        validatingToken: true
      }
    }

    case USER_LOGOUT_PENDING: {
      return {
        ...state,
        authLoading: true
      }
    }

    case USER_SIGNUP_PENDING: {
      return {
        ...state,
        authLoading: true
      }
    }

    case USER_SIGNUP_SUCCESS: {
      localStorage.setItem(AUTH_TOKEN_KEY, action.payload.token)
      return {
        ...state,
        authLoading: false,
        signupErrs: {},
        userToken: action.payload.token,
        user: action.payload.user,
        userLoggedIn: true
      }
    }

    case USER_LOGOUT_SUCCESS: {
      localStorage.removeItem(AUTH_TOKEN_KEY)
      return {
        ...initialState,
        validatingToken: false,
        userLoggedIn: false
      }
    }

    case TOKEN_VALIDATION_SUCCESS: {
      return {
        ...state,
        validatingToken: false,
        userLoggedIn: true,
        userToken: action.payload.token,
        user: action.payload.user
      }
    }

    case USER_LOGIN_SUCCESS: {
      localStorage.setItem(AUTH_TOKEN_KEY, action.payload.token)
      return {
        authLoading: false,
        loginErrs: {},
        signupErrs: {},
        userLoggedIn: true,
        userToken: action.payload.token,
        user: action.payload.user
      }
    }

    case USER_LOGIN_FAILURE: {
      const errors = _.get(action.payload, 'response.data', {})
      localStorage.removeItem(AUTH_TOKEN_KEY)
      return {
        ...state,
        authLoading: false,
        loginErrs: {...errors},
        signupErrs: {},
      }
    }

    case USER_LOGOUT_FAILURE: {
      return {
        ...state,
        authLoading: false
      }
    }

    case TOKEN_VALIDATION_FAILURE: {
      return {
        ...state,
        validatingToken:false,
        userLoggedIn: false
      }
    }

    case USER_SIGNUP_FAILURE: {
      const errors = _.get(action.payload, 'response.data', {})
      return {
        ...state,
        authLoading: false,
        signupErrs: errors
      }
    }

    default: return {...state}
  }
}