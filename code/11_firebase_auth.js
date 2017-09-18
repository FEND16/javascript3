import React, { Component } from "react";
import "../styles/App.css";
import firebase from '../firebase';

class App extends Component {
  
  state = {
    username: "",
    password: "",
    user: ""
  };

  componentDidMount(){
    firebase.auth()
      .onAuthStateChanged((user) =>{
        if(user){
          
          this.setState({ user: user });
        }else{
          this.setState({ user: ''})
        }
      })
  }
  
  onSubmit = e => {
    e.preventDefault();
    firebase.auth()
      .createUserWithEmailAndPassword(this.state.username, this.state.password)
      .then(user => console.log("Created user"))
      .catch(error => console.log(error))
  };

  signIn = () => {
    firebase.auth()
      .signInWithEmailAndPassword(this.state.username, this.state.password)
      .catch(error => console.log(error));
  }

  signOut = () => {
    firebase.auth().signOut();
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div>
        <header>
          <h1>Hello! { this.state.user && this.state.user.email }</h1>
        </header>
        <main>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="username"
                className="form-control m-3"
                value={this.state.username}
                onChange={this.onChange}
              />
              <input
                type="text"
                name="password"
                className="form-control m-3"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            <input type="submit" value="Register" className="btn btn-primary m-3" />
          </form>
          { !this.state.user && <button onClick={this.signIn}> Login </button>}
          { this.state.user && <button onClick={this.signOut}> Sign out </button> }
        </main>
      </div>
    );
  }
}
export default App;
