import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header>
          React
        </Header>
      </div>
    );
  }
}

class Header extends Component {
  render() {
    //this.props.children is automatically populated
    //if we add something between the Header-tag
    const { children } = this.props;
    //If the text equals "React", return "React!!!!!!" else, NAY!
    let value =
      children === "React"
        ? `${children}!!!!!!!!!`
        : "NAY!";
    return (
      <header className="header">
        <h1>
          { /* Print the variable value from before the return */ }
          {value}
        </h1>
      </header>
    );
  }
}

export default App;