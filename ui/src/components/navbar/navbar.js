import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar, NavbarBrand, Nav,
  NavItem, NavLink, NavbarToggler, Collapse,
  UncontrolledDropdown, DropdownToggle,
  DropdownMenu, DropdownItem } from 'reactstrap'
import { Route, NavLink as RouteNavLink } from 'react-router-dom'

class NavbarUnconnected extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false
    }

    this.toggle = this.toggle.bind(this);
  }

  toggle = (event) => {
    event.preventDefault();
    this.setState({ isExpanded: !this.state.isExpanded })
  }

  render () {

    return (
      <div>
        <Navbar light expand="md">
          <NavbarBrand to="/" tag={RouteNavLink}>
            Swift<sup>++</sup>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isExpanded} navbar>
            <Nav className="mr-auto" />
            {!this.props.userLoggedIn &&
              <Nav navbar>
                <NavItem>
                  <NavLink to="/login/" tag={RouteNavLink}>Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/signup/" tag={RouteNavLink}>Signup</NavLink>
                </NavItem>
              </Nav>
            }
            {this.props.userLoggedIn &&
              <Nav navbar>
                <NavItem>
                  <b><NavLink to={`/profile/${this.props.user.username}`} tag={RouteNavLink}>{this.props.user.username}</NavLink></b>
                </NavItem>
                {/* <NavItem>
                  <NavLink to="/contests" tag={RouteNavLink}>Contests</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/leaderboard" tag={RouteNavLink}>Leaderboard</NavLink>
                </NavItem> */}
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Options
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Option 1
                    </DropdownItem>
                    <DropdownItem>
                      Option 2
                    </DropdownItem>
                    <DropdownItem divider />
                    <Route render={({history}) => (
                      <DropdownItem onClick={e => {e.preventDefault(); history.push('/logout')}}>
                        Log Out
                      </DropdownItem>
                    )} />
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            }
          </Collapse>
        </Navbar>
      </div>
    );
  }
};

const mapStateToProps = ({auth}) => ({
  userLoggedIn: auth.userLoggedIn,
  user: auth.user
})

export const NavBar = connect(mapStateToProps)(NavbarUnconnected)
