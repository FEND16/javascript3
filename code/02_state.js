import React, { Component } from "react";
import "./App.css";

class App extends Component {

  state = {
    name: "Jesper",
    input: 'Hej',
    click: true
  }

  changeState = () => {
    this.setState({ name: 'Steffe'});
  }

  toggleStuff = () => {
    this.setState({ click: !this.state.click });
  }
  
  handleInput = ( e ) => {
    this.setState({ input: e.target.value  })
  }

  render() {
    const dogsAndCatsAndStuff = ["Cat", "Dog", "Buncha other animals", "not important animals", "wombat"];

    let list = [];
    for(let animal in dogsAndCatsAndStuff){
      //Vi måste pusha in varje JSX-element in i en ny array
      list.push(
        //Varje JSX-element eller komponent måste ha en nyckel
        <li key={ animal }>
           { dogsAndCatsAndStuff[animal] }
        </li>
      );
    }

    //Samma som ovan fast med en map istället för en vanlig for-loop
    const newList = dogsAndCatsAndStuff
        .map((item, index) => <li key={index}>{item}</li>);

    return (
      <div className="App" style={ { color: "white"}}>


        <ul>  
          { list }
        </ul>

        <ul>  
          { newList }
        </ul>

        <h1> { this.state.input } </h1>
        <button onClick={this.changeState}> 
          Click me please! 
        </button>
        <div>
        <input  type="text" 
                value={this.state.input} 
                onChange={this.handleInput}/>
        </div>
      </div>
    );
  }
}

class Header extends Component {
  render() {
    const { children } = this.props;
    let value = children === "React" ? `${children}!!!!!!!!!` : "Nay!";
    return (
      <header className="header">
        <h1>
          {value}
        </h1>
      </header>
    );
  }
}

export default App;


//Calling click functions in regular javascript

// testElement.addEventlistener('click', myFunction);

// testElement.addEventlistener('click',  function() {
//   myFunction("Hej");
// })