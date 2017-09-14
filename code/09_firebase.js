import React, { Component } from 'react';
import firebase from '../firebase';

export default class App extends Component{
  state = {
    messages: ''
  } 

  componentDidMount(){
    firebase.database().ref("messages")
      .on('value', (snapshot) =>{
        this.setState({messages: snapshot.val()});
      });
  }

  pushValue = () => {
    firebase.database()
      .ref("messages")
      .push("Hello from slides!")
  }

  remove = (item) => {
    firebase.database()
      .ref(`messsages/${item}`).remove()
  }
  
  render(){
     let list = [];
     for(let item in this.state.messages){
       list.push(
         <div key={item}>
            <p>{this.state.messages[item]}</p>
            <button 
              onClick={() => this.remove(item)}>
              Remove
            </button>
        </div>
      
      );
     }

     return(
       <div>
         <button onClick={this.pushValue} >
            Click me 
          </button>
          {list}
      </div>
     )
   }
}