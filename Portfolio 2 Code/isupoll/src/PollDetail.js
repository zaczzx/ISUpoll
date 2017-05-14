import React, { Component } from 'react';
import { Jumbotron, FormGroup, Button, FormControl } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';

const backgroundColors = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)'
];

const borderColors = [
  'rgba(255,99,132,1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)'
];

class PollDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pollName: '',
      selectedPoll: '',
      pollTitles: [],
      pollCounts: []
    }

    this.submitVote = this.submitVote.bind(this);
    this.handleVoteChange = this.handleVoteChange.bind(this);
  }

  componentDidMount() {
    const url = 'http://proj-319-150.cs.iastate.edu:3000/api/poll/' + this.props.pollID;
    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      this.setState({ pollName: json.name, pollTitles: json.options.map(option => option.title), pollCounts: json.options.map(option => option.count) });
    });
  }

  submitVote() {
    this.setState(function(prevState, props) {
      let index = this.state.pollTitles.findIndex(x => x == this.state.selectedPoll);
      let newCounts = prevState.pollCounts;
      newCounts[index] = newCounts[index] + 1;

      const url = 'http://proj-319-150.cs.iastate.edu:3000/api/poll/';

      let body = {
        id: this.props.pollID,
        options: prevState.pollTitles.map((title, i) => new Object({title: title, count: prevState.pollCounts[i]}))
      };
      fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
      })
      .then(response => response.json())
      .then(json => {
        console.log(json);
      });

      return {
        pollCounts: newCounts
      };
    });
  }

  handleVoteChange(e) {
    this.setState({selectedPoll: e.target.value});
  }

  render() {
    return (
      <Jumbotron>
        <h2>{this.state.pollName}</h2>
        <br />
        <p>I vote for....</p>
        <form>
          <FormControl componentClass="select" onChange={this.handleVoteChange}>
            <option value="" disabled selected>Select your option</option>
            { this.state.pollTitles.map(title => <option key={title} value={title}>{title}</option>) }
          </FormControl>
          <br />
          <Button onClick={this.submitVote}>Vote!</Button>
          <br /><br />
          <Pie data={{ labels: this.state.pollTitles, datasets: [{ label: "# of Votes", data: this.state.pollCounts, backgroundColor: backgroundColors, borderColor: borderColors, borderWidth: 1 }] }} redraw></Pie>
        </form>
      </Jumbotron>
    );
  }
}

export default PollDetail;
