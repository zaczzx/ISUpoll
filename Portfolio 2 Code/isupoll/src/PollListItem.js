import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ListGroupItem, Button } from 'react-bootstrap';
import PollList from './PollList';
import PollDetail from './PollDetail';

class PollListItem extends Component {
  constructor(props) {
    super(props);

    this.showPollDetail = this.showPollDetail.bind(this);
    this.deletePoll = this.deletePoll.bind(this);
  }

  showPollDetail() {
    ReactDOM.render(<PollDetail pollID={this.props.pollID} />, document.getElementById('mainContent'));
  }

  deletePoll(e) {
    e.stopPropagation();
    const url = 'http://proj-319-150.cs.iastate.edu:3000/api/poll/';
    const token = sessionStorage.getItem('token');
    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
      method: 'DELETE',
      body: JSON.stringify({ id: this.props.pollID })
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      ReactDOM.render(<PollList />, document.getElementById('mainContent'));
    });
  }

  render() {
    return (
      <ListGroupItem onClick={this.showPollDetail}>
        {this.props.name}
        {this.props.deletable &&
        <Button bsStyle="danger" className="pull-right" bsSize="small" onClick={this.deletePoll}>Delete</Button>
      }
      </ListGroupItem>
    );
  }
}

export default PollListItem;
