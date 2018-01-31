import React, {Component} from 'react';
import axios from 'axios';

class Shortener extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      users: [],
      user_id: false,
      original_url: '',
      short_url: ''
    };

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(this.props.apiUrl + 'users').then(response => {
      this.setState({
        users: response.data,
        user_id: response.data[0].id,
        disabled: false
      });
    });
  }

  handleUserChange(event) {
    this.setState({user_id: event.target.value});
  }

  handleUrlChange(event) {
    this.setState({original_url: event.target.value});
  }


  handleFormSubmit(event) {
    event.preventDefault();
    axios
      .get(
        this.props.apiUrl + 'short',
        {
          params: {
            user_id: this.state.user_id,
            original_url: this.state.original_url
          }
        }
      )
      .then(response => {
        if (response.data.result === 'OK') {
          this.setState({short_url: response.data.message});
        } else {
          this.setState({short_url: "[!] An error occurred while shortening the url"})
        }
      });
  }

  render() {
    const users = this.state.users.map(user =>
      <option value={user.id} key={user.id}>({user.id}) {user.name}</option>
    );
    return (
      <div>
        <h2>URL Shortener</h2>
        <form onSubmit={this.handleFormSubmit} className="form">
          <div className="form-group">
            <label htmlFor="user">User:</label>
            <select className="form-control" id="user" value={this.state.user_id} onChange={this.handleUserChange}>
              {users}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="originalUrl">Original URL:</label>
            <input
              type="text"
              className="form-control"
              id="originalUrl"
              value={this.state.original_url}
              placeholder="http://example.com"
              onChange={this.handleUrlChange}
            />
          </div>
          <button type="submit" disabled={this.state.disabled} className="btn btn-default">Make shorter url</button>
        </form>
        <div className="row">&nbsp;</div>
        <div className="row"><h2>{this.state.short_url}</h2></div>
      </div>
    );
  }
}

export default Shortener;
