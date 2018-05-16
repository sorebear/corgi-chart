import React, { Component } from 'react';
import axios from 'axios';

import withAuthorization from '../components/Session/withAuthorization';
import { db, auth } from '../firebase';

const fromObjectToList = (object) =>
  object
    ? Object.keys(object).map(key => ({ ...object[key], index: key }))
    : [];

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.API_KEY = '1b14081ee3e1b8bb4342a54211677fa8';
    this.updateTrelloKey = this.updateTrelloKey.bind(this);
    this.saveTrelloKey = this.saveTrelloKey.bind(this);
    this.auth = null;
    this.state = {
      users: [],
      trelloKey: 'test',
    };
  }

  saveTrelloKey() {
    console.log(this.state.trelloKey);
  }

  updateTrelloKey(e) {
    console.log(this);
    this.setState({ trelloKey: e.target.value })
  }

  componentDidMount() {
    // Get Boards
    console.log(window.location.href);
    window.open(
      'https://trello.com/1/authorize' +
      '?expiration=1day' +
      '&name=CorgiChart' +
      '&scope=read,write' +
      '&callback_method=postMessage' +
      '&response_type=token' + 
      `&key=${this.API_KEY}`);
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: fromObjectToList(snapshot.val()) }))
    );
  }

  render() {
    console.log('DB', db);
    console.log('withAuth', withAuthorization());
    const { users } = this.state;

    return (
      <div>
        <h1>Home</h1>
        <input 
          name="trello-key"
          value={this.state.trelloKey}
          onChange={this.updateTrelloKey}
        />
        <button onClick={this.saveTrelloKey}>
          Save Key
        </button>
        <p>The Home Page is accessible by every signed in user.</p>
        { !!users.length && <UserList users={users} /> }
      </div>
    );
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>List of App User IDs (Saved on Sign Up in Firebase Database)</h2>
    {users.map(user =>
      <div key={user.index}>{user.index}</div>
    )}
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);