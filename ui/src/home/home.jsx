import React from 'react'
import {NavBar as Navbar } from '../components/navbar/navbar'
import { Link } from 'react-router-dom'
import { Footer } from '../components/footer/footer'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'

import './home.css'

const HomePresent = (props) => {

  return (
    <div className="d-flex flex-column mb-3 home-container">
      <div className="p-2">
        <Navbar/>
      </div>
      <div className="p-2 flex-grow-1">
        {(()=>{
          if(props.userLoggedIn) {
            return (
              <div>
                <h1> GoTo Criteria Search </h1> <Button to='/criteria' tag={Link}>Search</Button>
              </div>
            )
          }
          else {
            return (
              <div className='d-flex flex-column justify-content-center align-self-center'> <Button to='/login' tag={Link}>Login</Button> <h1>to Continue.</h1> </div>
            )
          }
        })()}
      </div>
      <div className="p-2">
        <Footer />
      </div>
    </div>
  )
}

class Home extends React.Component {

  render () {
    return <HomePresent userLoggedIn={this.props.userLoggedIn}/>
  }
}

const mapStateToProps = ({auth: {userLoggedIn}}) => ({userLoggedIn})

export default connect(mapStateToProps)(Home)

// export default Home