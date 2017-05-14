import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Navigation from './Navigation'
import PollList from './PollList';

class App extends Component {
  componentDidMount() {
    this.showHome();
  }

  showHome() {
    ReactDOM.render(<PollList allPolls={true}/>, document.getElementById('mainContent'));
  }

  render() {
    return (
      <div className="App">
        <div id="nav">
          <Navigation isSignedIn={sessionStorage.getItem('username') != undefined}/>
        </div>
        <div id="mainContent" />
      </div>
    );
  }
}

export default App;
