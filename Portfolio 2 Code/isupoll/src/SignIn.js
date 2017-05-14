import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UserPollList from './UserPollList';
import Navigation from './Navigation';
import { Jumbotron, FormGroup, Button, FormControl } from 'react-bootstrap';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.submitSignUp = this.submitSignUp.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  submitSignUp() {
    fetch('http://proj-319-150.cs.iastate.edu:3000/api/auth/signin', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ username: this.state.username, password: this.state.password })
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      sessionStorage.setItem('token', json.token);
      sessionStorage.setItem('username', json.user.username);
      sessionStorage.setItem('id', json.user._id);
      ReactDOM.render(<UserPollList />, document.getElementById('mainContent'));
      ReactDOM.render(<Navigation isSignedIn={true}/>, document.getElementById('nav'));
    });
  }

  render() {
    return (
      <Jumbotron>
        <h2>Sign In</h2>
        <br />
        <form>
          <FormGroup controlId="formUsername">
            <FormControl type="username" placeholder="Username" onChange={this.handleUsernameChange} />
          </FormGroup>

          <FormGroup controlId="formPassword">
            <FormControl type="password" placeholder="Password" onChange={this.handlePasswordChange} />
          </FormGroup>

          <FormGroup>
            <Button bsStyle="success" onClick={this.submitSignUp}>Sign in</Button>
          </FormGroup>
        </form>
      </Jumbotron>
    );
  }
}

export default SignIn;
