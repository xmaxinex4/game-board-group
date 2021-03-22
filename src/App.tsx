import React, { useCallback, useState } from 'react';
import './App.css';

function App() {
  const [response, setResponse] = useState('No response yet');

  const getApi = (endpoint: any) => {
    fetch(
      `https://game-board-group-heroku-api.herokuapp.com/api/${endpoint}`,
    ).then((r) => {
      r.text().then((value) => {
        setResponse(value);
      });
    });
  };

  const checkStatus = useCallback(() => getApi(''), []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit
          <code>
            src/App.jsx
          </code>
          and save to reload.
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
      <button type="button" onClick={checkStatus}>Check API status</button>
      <div>
        Status:
        {response}
      </div>
    </div>
  );
}

export default App;
