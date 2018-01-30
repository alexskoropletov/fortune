import React, { Component } from 'react';
import './bootstrap.css';
import './App.css';
import './Shortener'
import './Detector'
import Shortener from "./Shortener";
import Detector from "./Detector";

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
              <Shortener/>
            </div>
            <div className="col-md-6 col-sm-6">
              <Detector/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
