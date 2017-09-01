import React, { Component } from 'react';

class SearchForm extends Component {
  state = {
    data: [],
    searchTerm: '' //value={this.state.searchTerm}
  }

  componentDidMount() {
    this.getDataFromApi(); //When <App /> is in the DOM, load the data
  }

  getDataFromApi = () => {
    fetch('https://fend-api.herokuapp.com/movies?_limit=20')
      .then(response => response.json())
      .then(data => {
        //When we are sure we have the data
        this.setState({ data: data });  
      })
      .catch(error => {
        //Else we can save an error to display later
        this.setState({ error: error })
      })
  }
  //Handle input onchange, [e.target.name] === <input name="searchTerm" />
  onChange = e => this.setState({[e.target.name] : e.target.value})

  render() {
    //Extract the array and the searchTerm from the state, makes it easier
    //to reference, don't have to write 'this.state' all the time
    const { searchTerm, data } = this.state; 
    //Loop through
    const list = data.map((item, index) => {
      //empty string evaluates to false, so if not empty, enter if-statement
      if(searchTerm){
        //Check if the name of the item includes what we are searching for
        //If the string is in the item.name, return div with item, else return empty string
        return item.title.includes(searchTerm) ? <div key={index}>{item.title} </div> : ''
      }else{
        //If no search is entered, just return everything in the array
        return <div key={index}>{item.name} </div>
      }
    });
    return (
      <div className="App">
        {list} {/* List is reference to the created array above*/}
        <input type="text" name="searchTerm" onChange={this.onChange} value={this.state.searchTerm} />
      </div>
    );
  }
}

export default SearchForm;