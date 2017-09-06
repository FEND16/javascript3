import React, { Component } from "react";

class App extends Component {

  render() {
    return (
      <div className="App">
        <Button primary title="Click me!"/>
        <PrimaryButton title="Click me!"/>
      </div>
    );
  }
}

function Button(props){
   //<Button primary /> evaluates to 'btn btn-primary'
   const buttonType = props.primary ? "btn btn-primary" : "btn";
   return( 
       <button onClick={props.onClick} className={buttonType}> 
         {props.title}
       </button>
   );
}


function PrimaryButton(props){
  //spread the props down, send them to the button component
  return <Button2 {...props} className="btn-primary"/>
}

function Button2(props){
  //concat the existing classname with new classname sent down by props
  return( 
      <button onClick={props.onClick} className={`btn ${props.className}`}> 
        {props.title}
      </button>
  );
}

