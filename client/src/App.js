import React, { Component } from 'react';
import './style/app.scss';
import Todos from './Components/Todos';

class App extends Component {

  render() {
    return(
      <div id="app">
        <Todos />
      </div>
    );
  }
}

export default App;
