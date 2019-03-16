import axios from 'axios'
import store from '../config/store'
import { AUTH_TOKEN_KEY } from '../config/constants'

const getTokenFromLocalStorage = () => {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    return token
  } catch(err) {
    console.log(`Unable to read localStorage: ${err}`)
  }
}

const getToken = () => {
  return new Promise((resolve, reject) => {
    const authState = store.getState().auth

    if(authState && authState.userToken) resolve(authState.userToken)
    const token = getTokenFromLocalStorage()
    if(!token) {
      reject('Token couldn\'t be read from localStorage')
    } else {
      resolve(token)
    }
  })
}

export const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 20000
})

axiosInstance.interceptors.request.use(req => {
  return getToken()
    .then(token => {
      if (token) req.headers['Authorization'] = `Token ${token}`
      return req
    })
    .catch(err => {
      console.log(err)
      return req
    })
})