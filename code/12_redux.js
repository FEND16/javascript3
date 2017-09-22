import React, { Component } from "react";
import "../styles/App.css";
import { createStore } from 'redux';
const store = createStore(Counter);

function Counter(state = 0, action){
  switch(action.type){
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}


export default class App extends Component {

  state = {
    counter: 0
  }

  componentDidMount(){
    store.subscribe(()=>{
      this.setState({ counter: store.getState()})
    })
  }
  render() {
    return (
      <div className="app">
          { this.state.counter }
          <button 
            onClick={() => {store.dispatch({ type: "INCREMENT" })}} >
            Increment
            </button>
          <button 
            onClick={() => {store.dispatch({ type: "DECREMENT" })}} >
            Decrement
            </button>
      </div>
    );
  }
}
