import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Button } from 'reactstrap'
import { HOME_EXACT_ROUTES } from '../config/constants'
import { NavBar as Navbar } from '../components/navbar/navbar'
import { Footer } from '../components/footer/footer'
import { FormGroup, Container } from 'reactstrap'
import LoadingOverlay from 'react-loading-overlay'
import { connect } from 'react-redux'
import { logUserOut } from './actions'
import './styles/auth.css'

const LogoutPresent = (props) => {
  return (
    <div className="d-flex flex-column mb-3 auth-container">
      <div className="p-2">
        <Navbar />
      </div>
      <Container className="p-2 d-flex flex-grow-1 justify-content-center align-items-center">
          <div className="d-flex justify-content-center align-items-center flex-column">
            <h1> Are you sure you want to logout?</h1>
            <FormGroup row className="logout-form d-flex justify-content-between">
              <Button
                className="logout-form-button" 
                onClick={props.handleLogoutClick} color="danger">Confirm</Button>
              <Route render={({history}) => {
                return (
                  <Button 
                    className="logout-form-button"
                    color="success"
                    onClick={history.goBack}> 
                    Go Back
                  </Button>
                ) }} />
            </FormGroup>
          </div>
      </Container>
      <div className="p-2">
        <Footer />
      </div>
    </div>
  )
}

class Logout extends React.Component {
  
  handleLogoutClick = () => {
    this.props.logUserOut()
  }
  
  render () {
    if (this.props.userLoggedIn === false) return <Redirect to={HOME_EXACT_ROUTES[1]} />
    return (
      <LoadingOverlay
          className="auth-overlay"
          active={this.props.authLoading}
          spinner
          text="Logging you out..."
        >
        <LogoutPresent handleLogoutClick={this.handleLogoutClick} />
      </LoadingOverlay>
    )
  }
}

const mapStateToProps = ({auth: {userLoggedIn, authLoading}}) => ({userLoggedIn, authLoading})
const mapDispatchToProps = { logUserOut }

export default connect(mapStateToProps, mapDispatchToProps)(Logout)