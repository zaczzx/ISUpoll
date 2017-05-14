import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Jumbotron, FormGroup, Button, FormControl } from 'react-bootstrap';
import UserPollList from './UserPollList';

class CreatePoll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      options: []
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleOptionsChange = this.handleOptionsChange.bind(this);
    this.createNewPoll = this.createNewPoll.bind(this);
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  handleOptionsChange(e) {
    let input = e.target.value.split('\n');
    let options = [];
    input.forEach(function(data) {
      if (data != "") {
        let obj = {}
        obj['title'] = data;
        obj['count'] = 0;
        options.push(obj);
      }
    });
    this.setState({options: options});
  }

  createNewPoll() {
    const username = sessionStorage.getItem('username');
    fetch('http://proj-319-150.cs.iastate.edu:3000/api/poll/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ username: username, name: this.state.name, options: this.state.options })
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      ReactDOM.render(<UserPollList />, document.getElementById('mainContent'));
    });
  }

  render() {
    return (
      <Jumbotron>
        <h2>Create a new Poll</h2>
        <br />
        <form>
          <FormGroup controlId="formPollName">
            <FormControl type="text" placeholder="Poll Name" onChange={this.handleNameChange} />
          </FormGroup>

          <FormGroup controlId="formPassword">
            <FormControl componentClass="textarea" placeholder="Options (Each option on a new line)" onChange={this.handleOptionsChange} />
          </FormGroup>

          <FormGroup>
            <Button bsStyle="primary" onClick={this.createNewPoll}>Create</Button>
          </FormGroup>
        </form>
      </Jumbotron>
    );
  }
}

export default CreatePoll;
