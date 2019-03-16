import React from 'react'
import Routes from './routes'
import { validateToken } from './auth/actions'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import LoadingOverlay from 'react-loading-overlay'
import Alert from 'react-s-alert'

import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css'
import './App.css'

class App extends React.Component {
  componentWillMount = () => {
    this.props.validateToken()
  }

  render () {
    return (
      <LoadingOverlay
        className="app-overlay"
        active={this.props.validatingToken}
        spinner
        text="Validating Session"
      >
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
        <Alert stack={{limit: 4}} effect="stackslide" position="bottom-right"/>
      </LoadingOverlay>
    )
  }
}
const mapStateToProps = ({auth}) => ({validatingToken: auth.validatingToken})
const mapDispatchToProps = { validateToken }

export default connect(mapStateToProps, mapDispatchToProps)(App)