import React, { Component } from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import PollListItem from './PollListItem';

class PollList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      polls: []
    };
  }

  componentDidMount() {
    fetch('http://proj-319-150.cs.iastate.edu:3000/api/polls')
    .then(response => response.json())
    .then(json => {
      console.log(json);
      this.setState({ polls: json });
    });
  }

  render() {
    return (
      <Panel collapsible defaultExpanded header="All Polls">
        <ListGroup fill>
          { this.state.polls.map(poll => <PollListItem deletable={false} name={poll.name} key={poll._id} pollID={poll._id}/>) }
        </ListGroup>
      </Panel>
    );
  }
}

export default PollList;
