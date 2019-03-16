import React from 'react'
import { connect } from 'react-redux'
import { NavBar as Navbar } from '../components/navbar/navbar'
import { Footer } from '../components/footer/footer'
import { Nav, NavItem, NavLink, TabContent,
  TabPane, ListGroup, Alert } from 'reactstrap'
import { ContestLi } from './components/contest-li'
import  { Helmet } from 'react-helmet'
import { withAuthentication } from '../hoc/with-authentication'
import classnames from 'classnames'
import './styles/contests-home.css'

const ONGOING_CONTESTS_TAB = 'ONGOING_CONTESTS_TAB'
const UPCOMING_CONTESTS_TAB = 'UPCOMING_CONTESTS_TAB'
const PAST_CONTESTS_TAB = 'PAST_CONTESTS_TAB'

const ContestsTabItem = (props) => {
  return (
    <NavItem>
      <NavLink
        tag="a"
        href="#"
        className={classnames({active: props.activeTab === props.tabType})}
        onClick={() => props.changeSetTab(props.tabType)}
      >
        {props.tabTitle}
      </NavLink>
    </NavItem>
  )
}

const ContestsTabContent = (props) => {
  return (
    <ListGroup>
      {!props.contestsList && 
        <Alert color="danger">
          No Contests Available.
        </Alert>
      }
      {props.contestsList &&
        props.contestsList.map(contest => {
          return (
            <ContestLi contest={contest}/>
          )
        })
      }
    </ListGroup>
  )
}

const ContestsPresent = (props) => {

  const { activeTab, changeSetTab } = props

  return (
    <div className="d-flex flex-column mb-3 contests-body-container">
      <Helmet>
        <title>Contests</title>
      </Helmet>
      <div className="p-2">
        <Navbar />
      </div>
      <div className="p-2 flex-grow-1">
        <Nav tabs>
          <ContestsTabItem tabType={ONGOING_CONTESTS_TAB} tabTitle="Ongoing Contests" {...{changeSetTab, activeTab}}/>
          <ContestsTabItem tabType={UPCOMING_CONTESTS_TAB} tabTitle="Upcoming Contests" {...{changeSetTab, activeTab}}/>
          <ContestsTabItem tabType={PAST_CONTESTS_TAB} tabTitle="Past Contests" {...{changeSetTab, activeTab}}/>
        </Nav>
        <TabContent activeTab={props.activeTab}>
          <TabPane tabId={ONGOING_CONTESTS_TAB}>
            {<ContestsTabContent {...props} />}
          </TabPane>
          <TabPane tabId={UPCOMING_CONTESTS_TAB}>
            {<ContestsTabContent {...props} />}
          </TabPane>
          <TabPane tabId={PAST_CONTESTS_TAB}>
            {<ContestsTabContent {...props} />}
          </TabPane>
        </TabContent>
      </div>
      <div className="p-2">
        <Footer />
      </div>
    </div>
  )
}

class Contests extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      activeTab: ONGOING_CONTESTS_TAB,
      contestsList: [
        {
          id: 1,
          code: "CODE",
          name: "Code The Fuck Out",
          description: "This is the description",
          startTime: "2019-01-13T14:30Z",
          endTime: "2019-01-13T16:30Z",
          userRegistered: false
        }
      ]
    }
  }

  changeSetTab = (newTab) => {
    this.setState({
      activeTab: newTab
    })
  }

  render () {

    const propsToSend = {
      ...this.state,
      changeSetTab: this.changeSetTab
    }

    return <ContestsPresent {...propsToSend} />
  }
}

export default withAuthentication(connect()(Contests))