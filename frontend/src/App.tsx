import React from 'react';
import './css/App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import routes from './routes';

function App() {
  return (
    <div className="App">
        {routes}
    </div>
  );
}

export default App;