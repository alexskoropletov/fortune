import React, { Component } from 'react';
import './bootstrap.css';
import './App.css';
import './Shortener'
import './Detector'
import Shortener from "./Shortener";
import Detector from "./Detector";
import config from './config';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <header className="App-header">
            <h1 className="App-title">Welcome</h1>
          </header>
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <Shortener apiUrl={config.API_URL}/>
            </div>
            <div className="col-md-6 col-sm-6">
              <Detector apiUrl={config.API_URL}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
