import React, { Component } from 'react';
import axios from 'axios';

class Shortener extends Component {
  constructor(props) {
    super(props);
    this.state = {disabled: true, users: [], user: false};
    axios.get('http://fortune-api.skoropletov.ru/api/users').then(response => {
      this.setState({users: response.data, disabled: false});
    });

    this.handleUserChange = this.handleUserChange.bind(this);
  }

  handleUserChange(event) {
    this.setState({user: event.target.value});
  }

  render() {
    const users = this.state.users.map(user =>
      <option value={user.id} key={user.id}>{user.name}</option>
    );
    return (
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="user">User:</label>
            <select className="form-control" id="user" value={this.state.user} onChange={this.handleUserChange}>
              {users}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="originalUrl">Original URL:</label>
            <input type="text" className="form-control" id="originalUrl" placeholder="http://example.com"/>
          </div>
          <button type="submit" disabled={this.state.disabled} className="btn btn-default">Make it shorter</button>
        </form>
      </div>
    );
  }
}

export default Shortener;
