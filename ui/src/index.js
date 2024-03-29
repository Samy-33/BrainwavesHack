import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/js/dist'

import { Provider } from 'react-redux'
import store from './config/store'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'))

registerServiceWorker()
