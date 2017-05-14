import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import PollList from './PollList';
import UserPollList from './UserPollList';
import SignUp from './SignUp';
import SignIn from './SignIn';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: props.isSignedIn
    };

    this.showSignUp = this.showSignUp.bind(this);
    this.showSignIn = this.showSignIn.bind(this);
    this.showHome = this.showHome.bind(this);
    this.showUserPolls = this.showUserPolls.bind(this);
    this.signOut= this.signOut.bind(this);
  }

  showSignUp() {
    ReactDOM.render(<SignUp />, document.getElementById('mainContent'));
  }

  showSignIn() {
    ReactDOM.render(<SignIn />, document.getElementById('mainContent'));
  }

  showHome() {
    ReactDOM.render(<PollList />, document.getElementById('mainContent'));
  }

  showUserPolls() {
    ReactDOM.render(<UserPollList />, document.getElementById('mainContent'));
  }

  signOut() {
    sessionStorage.clear();
    this.showHome();
    this.setState({ isSignedIn: false});
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a onClick={this.showHome}>ISUPoll</a>
          </Navbar.Brand>
        </Navbar.Header>
        {this.state.isSignedIn ? (
          <Nav pullRight>
            <NavItem onClick={this.showUserPolls}>{sessionStorage.getItem('username')}</NavItem>
            <NavItem onClick={this.signOut}>Sign Out</NavItem>
          </Nav>
        ) : (
          <Nav pullRight>
            <NavItem onClick={this.showSignIn}>Sign In</NavItem>
            <NavItem onClick={this.showSignUp}>Sign Up</NavItem>
          </Nav>
        )}
      </Navbar>
    );
  }
}

export default Navigation
