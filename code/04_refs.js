import React, { Component } from "react";
import "./App.css";

class App extends Component {

  handleChange = () => {
    const inputFromDom = document.getElementById('input').value;
    console.log(inputFromDom);
    console.log(this.input.value);
  };

  componentDidMount(){
    this.input.focus();
  }
  render() {
    return (
      <div className="App">
        <h1> Using refs </h1>
        <input
          id="input"
          ref={node => {this.input = node;}}
          className="input"
          name="value"
          placeholder="Using refs?"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default App;