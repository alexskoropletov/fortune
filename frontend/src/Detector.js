import React, { Component } from 'react';
import axios from 'axios';

class Detector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      short_url: ''
    };

    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleUrlChange(event) {
    this.setState({short_url: event.target.value});
  }


  handleFormSubmit(event) {
    event.preventDefault();
    axios
      .get(
        this.props.apiUrl + 'original',
        {
          params: {
            short_url: this.state.short_url
          }
        }
      )
      .then(response => {
        if (response.data.result === 'OK') {
          this.setState({message: 'User ID is ' + response.data.user_id});
        } else {
          this.setState({message: "[!] An error occurred while shortening the url"})
        }
      });
  }

  render() {
    return (
      <div>
        <h2>Short URL decoder</h2>
        <form onSubmit={this.handleFormSubmit} className="form">
          <div className="form-group">
            <label htmlFor="shortUrl">Short URL:</label>
            <input
              type="text"
              className="form-control"
              id="shortUrl"
              value={this.state.short_url}
              placeholder="http://goo.gl/12345"
              onChange={this.handleUrlChange}
            />
          </div>
          <button type="submit" disabled={this.state.disabled} className="btn btn-default">Figure out user by url</button>
        </form>
        <div className="row">&nbsp;</div>
        <div className="row"><h2>{this.state.message}</h2></div>
      </div>
    );
  }
}

export default Detector;
