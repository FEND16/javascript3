import React, { Component } from 'react';
import firebase from '../firebase';

export default class App extends Component{
    state ={
        todos: [],
        value: ''
    }
    
    componentDidMount(){

        firebase.database().ref("todos")
        .orderByChild("content")
        .startAt("a")
        .on('child_added', (snapshot) => {
          const todos = [...this.state.todos];     
          //Create todo
          const todo = {
            key: snapshot.key,
            value: snapshot.val()
          }
          //Push todo in state  
          todos.push(todo);
          this.setState({ 
            todos: todos
          });
        })
        
        firebase.database().ref("todos")
        .on('child_removed', (snapshot) => {
          //Still need the state
          const todos = [...this.state.todos];
          //Higher Order function
          const filteredTodo = todos
            .filter((item) =>{
              if(item.key !== snapshot.key){
                return item
              }
          })
          this.setState({ 
            todos: filteredTodo
          });
        })
        
        firebase.database().ref("todos")
        .on('child_changed', (snapshot) => {
          //Copy state
          const todos = [...this.state.todos];     
          
          //Loop the object
          const updatedTodos = todos.map(item =>{
            //If object is found
            if(item.key === snapshot.key){
              
              return Object
                .assign({}, item, snapshot.val())
            }else{
              return item;
            }
          })
          this.setState({ 
            todos: updatedTodos
          });
        })
    } 

    addTodo = e => {
      e.preventDefault();
      const todo = {
        content: this.state.value,
        date: (new Date()).toLocaleString()
      }
      firebase.database().ref("todos").push(todo);
    }

    removeTodo = key => {
      firebase.database().ref(`todos/${key}`).remove();
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value})

    render(){
        const list = this.state.todos.map(todo =>
          <div key={todo.key}>
            { todo.value.content }  - {todo.value.date}
            <button className="btn btn-secondary" 
              onClick={() => this.removeTodo(todo.key)}>
              Remove me!
            </button>
          </div>  
        )
        return(
            <div className="container pt-5">
              <div className="row justify-content-center text-center">
                <form onSubmit={this.addTodo} className="col-12">
                    <div className="form-group">
                      <input 
                        type="text" 
                        className="form-control"
                        value={this.state.value} 
                        onChange={this.onChange} 
                        name="value"/>
                    </div>
                    <div className="form-group">
                      <input 
                            type="submit" 
                            value="Send" 
                            className="btn btn-primary" />
                    </div>
                </form>
                </div>
                <div className="row justify-content-center text-center">
                  <div className="col-12">
                    {
                      list
                    }
                  </div>
                </div>
            </div>

            )
    }
}


// function toArray(firebaseObject) {
//   let array = []
//   for(let item in firebaseObject){
//     array.push({ key: item, value: firebaseObject[item] })
//   }
//   return array;
// }