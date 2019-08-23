import React from 'react';
import logo from './logo.svg';
import Square from './components/jobitem'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="row">
            <Square value = {'a test'}></Square>
            <p>Some good old text</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
