import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Panel, ListGroup, Button } from 'react-bootstrap';
import CreatePoll from './CreatePoll';
import PollListItem from './PollListItem';

class UserPollList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      polls: []
    };

    this.handleCreateNewPoll = this.handleCreateNewPoll.bind(this);
  }

  componentDidMount() {
    const url = 'http://proj-319-150.cs.iastate.edu:3000/api/polls/' + sessionStorage.getItem('username');
    const token = sessionStorage.getItem('token');
    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      this.setState({ polls: json });
    });
  }

  handleCreateNewPoll() {
    ReactDOM.render(<CreatePoll />, document.getElementById('mainContent'));
  }

  render() {
    return (
      <div>
        <Panel collapsible defaultExpanded header="My Polls">
          <Button bsStyle="success" onClick={this.handleCreateNewPoll}>Create New Poll</Button>
          <ListGroup fill>
            { this.state.polls.map(poll => <PollListItem deletable={true} name={poll.name} key={poll._id} pollID={poll._id}/>) }
          </ListGroup>
        </Panel>
      </div>
    );
  }
}

export default UserPollList;
