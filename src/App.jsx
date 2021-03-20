import React, { useCallback, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [response, setResponse] = useState("No response yet");

  const getApi = endpoint => {
    fetch(process.env.PORT ? `https://game-board-group-heroku.herokuapp.com:${process.env.PORT}/api/${endpoint}` : `http://localhost:9000/api/${endpoint}`)
      .then(function (r) {
        r.text().then((value) => {
          setResponse(value);
        });
      })
  }

  const checkStatus = useCallback(() => getApi(''), []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button
        onClick={checkStatus}
      >
        Check API status
      </button>
      <div>Status: {response}</div>
    </div>
  );
}

export default App;
