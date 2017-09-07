import React from 'react';
import PropTypes from 'prop-types';

function Text({ style, title = "Default" }){
  const newTitle = title ? title : "Default";
  return <h1 style={style}> 
          { title } 
         </h1>
}

Text.propTypes = {
  title: PropTypes.string.isRequired,
  style: PropTypes.object
}

Text.defaultProps = {
  title: "Default Title"
}