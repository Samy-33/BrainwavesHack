import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { withProps } from 'recompose'
import { Footer } from '../components/footer/footer'
import { connect } from 'react-redux'
import { validateToken, logUserIn } from './actions'
import { NavBar as Navbar } from '../components/navbar/navbar'
import LoginView from './login'
import LogoutView from './logout'
import './styles/auth.css'

const AuthPresent = (props) => {
  console.log(props)
  const { logUserIn, userLoggedIn } = props
  return (
    <div className="d-flex flex-column mb-3 auth-route-container">
      <div className="p-2">
        <Navbar />
      </div>
      <div className="p-2 flex-grow-1">
        <Switch>
          <Route path="/auth/login/" render={withProps({ logUserIn })(LoginView)} />
          <Route path="/auth/logout/" render={withProps({ userLoggedIn })(LogoutView)} />
          <Route path="/auth/signup/" component="" />
        </Switch>
      </div>
      <div className="p-2">
        <Footer />
      </div>
    </div>
  )
}

class Auth extends React.Component {
  render () {
    const { userLoggedIn } = this.props

    return <AuthPresent {...this.props} />
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
  userLoggedIn: auth.userLoggedIn
})

const mapDispatchToProps = {validateToken, logUserIn}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth))