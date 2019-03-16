import { axiosInstance as axios } from './axios'

/**
 * Check whether a token in `Authorization` header is valid or not
 * 
 * @returns {Promise} when resolved gives userToken and user object
 */
export const checkTokenValidation = () => {
  const url = '/api/user/check-token/'
  return axios.get(url)
    .then(response => ({...response.data}))
}


/**
 * logs a user in with username and password
 * 
 * @param {String} username
 * @param {String} password
 * 
 * @returns {Promise} on resolving gives user information
 */
export const logUserIn = (username, password) => {
  const url = '/api/user/login/'
  return axios.post(url, { username, password })
    .then(response => ({...response.data}))
    .catch((err, response) => {
      console.log(err)
      console.log(response)
      throw(err)
    })
}

/**
 * Logs a user out
 */
export const logUserOut = () => {
  const url = '/api/auth/logout/'
  return axios.post(url)
    .then(response => response.data)
}


export const signUserUp = (username, password, email, firstName, lastName) => {
  const url = '/api/user/signup/'
  return axios.post(url, {
    username, password, email, first_name: firstName, last_name: lastName
  })
    .then(response => response.data)
}