import React, { Component } from "react";
import PropTypes from 'prop-types';

class App extends Component {
  
  getChildContext() {
    return { 
      contextString: "Big nono!"
    };
  }
  render() {
    return (
      <div className="container p-5"> 
        <Div text="I'm happening via props!"/>
      </div>
    );
  }
}

App.childContextTypes = {
  contextString: PropTypes.string
}

function Div(props){
  return <Text {...props}/>
}

function Text(props, context) {
    return(
      <h1> 
        {context.contextString} 
      </h1>
    )
}

Text.contextTypes = {
  contextString: PropTypes.string
};

export default App;
