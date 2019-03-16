import { checkTokenValidation, logUserIn as logUserInAPI,
  logUserOut as logUserOutAPI, signUserUp as signUserUpAPI
} from "../api/auth"
import { 
  TOKEN_VALIDATION, USER_LOGIN, USER_LOGOUT, USER_SIGNUP
} from "../config/constants"

export const validateToken = () => {
  return dispatch => {
    return dispatch({
      type: TOKEN_VALIDATION,
      payload: checkTokenValidation()
    })
  }
}

export const logUserIn = (username, password) => {
  return dispatch => {
    return dispatch({
      type: USER_LOGIN,
      payload: logUserInAPI(username, password)
    })
  }
}

export const logUserOut = () => {
  return dispatch => {
    return dispatch({
      type: USER_LOGOUT,
      payload: logUserOutAPI()
    })
  }
}

/**
 * Signs Up a user
 *  
 * @param  {...any} args: contains username, password, email, firstName and lastName 
 * in this particular order
 */
export const signUserUp = (...args) => {
  return dispatch => {
    return dispatch({
      type: USER_SIGNUP,
      payload: signUserUpAPI(...args)
    })
  }
}