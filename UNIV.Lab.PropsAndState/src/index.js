import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Color = (props) => {
  return (
    <div className={props.color} onClick={() => props.selectColor(props.color)} />
  )
}

const Picker = () => {
  const [selectedColor, setSelectedColor] = useState('blue');
  
  const selectColor = (colorName) => {
    setSelectedColor(colorName);
  }
  
  return (
    <div id="container">
      <div id="navbar">
        <div>Currently selected: </div>
        <div className={selectedColor}>{selectedColor}</div>
      </div>
      <div id="colors-list">
        <Color color='blue' selectColor={selectColor} />
        <Color color='green' selectColor={selectColor} />
        <Color color='violet' selectColor={selectColor} />
      </div>
    </div>
  );
}
ReactDOM.render(
  <Picker />,
  document.getElementById('app')
);