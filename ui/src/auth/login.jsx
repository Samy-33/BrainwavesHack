import React from 'react'
import { Container, Input, Form, FormGroup,
  FormFeedback, Label, Button } from 'reactstrap'
import { NavBar as Navbar } from '../components/navbar/navbar'
import { Footer } from '../components/footer/footer'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { HOME_EXACT_ROUTES } from '../config/constants'
import LoadingOverlay from 'react-loading-overlay'
import { logUserIn } from './actions'
import './styles/auth.css'

const LoginPresent = (props) => {

  const { username, password, handleUsernameChange, handlePasswordChange, handleSubmit, loginErrs } = props

  return (
    <div className="d-flex flex-column mb-3 auth-container">
      <div className="p-2">
        <Navbar />
      </div>
      <div className="p-2 flex-grow-1">
        <Container className="auth-form-container">
          <h3><b>Login</b></h3>
          <Form className="auth-form">
            <FormGroup>
              <Label for="username"> Username </Label>
              <Input type="text"
                value={username}
                name="username"
                id="username"
                placeholder="Username"
                invalid={(loginErrs.username || loginErrs.non_field_errors) ? true: false}
                onChange={handleUsernameChange}
              />
              <FormFeedback valid={!loginErrs.username}>
                {loginErrs.username}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="password"> Password </Label>
              <Input type="password"
                value={password}
                name="password"
                id="password"
                placeholder="********"
                invalid={(loginErrs.password || loginErrs.non_field_errors)? true: false}
                onChange={handlePasswordChange}
              />
              <FormFeedback valid={!loginErrs.password}>
                {loginErrs.password}
              </FormFeedback>
              <FormFeedback valid={!loginErrs.non_field_errors}>
                {loginErrs.non_field_errors}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Button className="login-form-button" color="success" onClick={handleSubmit}>Login</Button>
              <Link to="forgot-password">
                <Button color="link">
                  Forgot Password
                </Button>
              </Link>
            </FormGroup>

          </Form>
        </Container>
      </div>
      <div className="p-2">
        <Footer />
      </div>
    </div>
  )
}

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }

  handleUsernameChange = (event) => {
    event.preventDefault()
    this.setState({...this.state, username: event.target.value})
  }

  handlePasswordChange = (event) => {
    event.preventDefault()
    this.setState({...this.state, password: event.target.value})
  }

  handleSubmit = () => {
    this.props.logUserIn(this.state.username, this.state.password)
  }

  render () {

    if(this.props.userLoggedIn === true) return <Redirect to={HOME_EXACT_ROUTES[0]} />

    const propsToSend = {...this.state,
      handlePasswordChange: this.handlePasswordChange,
      handleUsernameChange: this.handleUsernameChange,
      handleSubmit: this.handleSubmit,
      loginErrs: this.props.loginErrs
    }
    return (
        <LoadingOverlay
          className="auth-overlay"
          active={this.props.authLoading}
          spinner
          text="Logging you in..."
        >
          <LoginPresent {...propsToSend}/>
        </LoadingOverlay>
    )
  }
}

const mapStateToProps = ({ auth: {loginErrs, authLoading, userLoggedIn} }) => ({
  loginErrs,
  authLoading,
  userLoggedIn
})

const mapDispatchToProps = { logUserIn }

export default connect(mapStateToProps, mapDispatchToProps)(Login)