import React from 'react'
import { Container, Form, FormGroup, Input,
  FormFeedback, Label, Button, FormText } from 'reactstrap'
import LoadingOverlay from 'react-loading-overlay'
import { NavBar as Navbar } from '../components/navbar/navbar'
import { Footer } from '../components/footer/footer'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUserUp } from './actions'

const SignupPresent = (props) => {

  const { handleUsernameChange, handlePasswordChange, handleEmailChange,
    handleFNChange, handleLNChange, handleSubmit } = props
  
  const { username, password, email, firstName, lastName, signupErrs } = props

  const requiredAsterisk = <font color="red">*</font>
  return (
    <div className="d-flex flex-column mb-3 auth-container">
      <div className="p-2">
        <Navbar />
      </div>
      <div className="p-2 flex-grow-1">
        <Container className="auth-form-container">
          <center><h4><b>Sign Up</b></h4></center>
          <Form className="auth-form">
            <FormGroup>
              <Label for="username">Username{requiredAsterisk}</Label>
              <Input type="text"
                  name="username"
                  id="username"
                  value={username}
                  placeholder="Username"
                  invalid={signupErrs.username?true:false}
                  onChange = {handleUsernameChange}/>
              <FormFeedback valid={!signupErrs.username}>
                  {signupErrs.username}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password{requiredAsterisk}</Label>
              <Input type="password"
                  name="password"
                  id="password"
                  value={password}
                  placeholder="********"
                  invalid={signupErrs.password?true:false}
                  onChange = {handlePasswordChange}/>
              <FormText>Password must be at least 8 characters long.</FormText>
              <FormFeedback valid={!signupErrs.password}>
                  {signupErrs.password}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email Address{requiredAsterisk}</Label>
              <Input type="email"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="username@iiitdmj.ac.in"
                  invalid={signupErrs.email?true:false}
                  onChange = {handleEmailChange}/>
              <FormFeedback valid={!signupErrs.email}>
                  {signupErrs.email}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="first_name">First Name{requiredAsterisk}</Label>
              <Input type="text"
                  name="first_name"
                  id="first_name"
                  value={firstName}
                  placeholder="Subhash"
                  invalid={signupErrs.first_name?true:false}
                  onChange = {handleFNChange}/>
              <FormFeedback valid={!signupErrs.first_name}>
                  {signupErrs.first_name}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="last_name">Last Name{requiredAsterisk}</Label>
              <Input type="text"
                  name="last_name"
                  id="last_name"
                  value={lastName}
                  placeholder="Gupta"
                  invalid={signupErrs.last_name?true:false}
                  onChange = {handleLNChange}/>
              <FormFeedback valid={!signupErrs.last_name}>
                  {signupErrs.last_name}
              </FormFeedback>
            </FormGroup>
            <Button color="success" block onClick={handleSubmit}>Register</Button>

          </Form>
        </Container>
      </div>
      <div className="p-2">
        <Footer />
      </div>
    </div>
  )
}


class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: ''
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleFNChange = this.handleFNChange.bind(this)
    this.handleLNChange = this.handleLNChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleUsernameChange = (e) => {
    this.setState({...this.state, username: e.target.value})
  }

  handlePasswordChange = (e) => {
    this.setState({...this.state, password: e.target.value})
  }

  handleEmailChange = (e) => {
    this.setState({...this.state, email: e.target.value})
  }

  handleFNChange = (e) => {
    this.setState({...this.state, firstName: e.target.value})
  }

  handleLNChange = (e) => {
    this.setState({...this.state, lastName: e.target.value})
  }

  handleSubmit = () => {
    const {username, password, email, firstName, lastName} = this.state
    this.props.signUserUp(username, password, email, firstName, lastName)
  }

  render () {

    if(this.props.userLoggedIn) return <Redirect to="/" />

    const propsToSend = {
      ...this.props,
      handleUsernameChange: this.handleUsernameChange,
      handlePasswordChange: this.handlePasswordChange,
      handleEmailChange: this.handleEmailChange,
      handleFNChange: this.handleFNChange,
      handleLNChange: this.handleLNChange,
      handleSubmit: this.handleSubmit
    }

    return (
      <LoadingOverlay
        className="auth-overlay"
        active={this.props.authLoading}
        spinner
        text="Registering..."
      >
        <SignupPresent {...propsToSend} />
      </LoadingOverlay>
    )
  }
}

const mapStateToProps = ({ auth:{ signupErrs, userLoggedIn, authLoading }}) => ({
  signupErrs, userLoggedIn, authLoading
})

const mapDispatchToProps = { signUserUp }

export default connect(mapStateToProps, mapDispatchToProps)(Signup)