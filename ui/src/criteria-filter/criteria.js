import React from 'react'
import {NavBar as Navbar } from '../components/navbar/navbar'
import { Footer } from '../components/footer/footer'
import FilterForm from './components/filter-form'
import FilteredTable from './components/filtered_data'
import {withAuthentication} from '../hoc/with-authentication'
import { load_filtered_data_for_queries } from './actions'
import { connect } from 'react-redux'


const CriteriaPresent = (props) => {
    return (
        <div className="d-flex flex-column mb-3 home-container">
            <div className="p-2">
                <Navbar/>
            </div>
            <div className="p-2 flex-grow-1">
               <FilterForm />
               <FilteredTable />
            </div>
            <div className="p-2">
                <Footer />
            </div>
        </div>
    )
}

class Criteria extends React.Component {

    componentDidMount () {
      this.props.load_filtered_data_for_queries({})
    }

    render() {
        return <CriteriaPresent {...this.props} />
    }
}

const mapPropsToDispatch = { load_filtered_data_for_queries }

export default withAuthentication(connect(null, mapPropsToDispatch)(Criteria))

/*
import React from 'react'
import {NavBar as Navbar } from '../components/navbar/navbar'
import { Link } from 'react-router-dom'
import { TopTenTable } from '../components/top-ten-table/top-ten-table'
import { Footer } from '../components/footer/footer'
import { Container, Row, Col, Button } from 'reactstrap'
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
*/