import React from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import routes from './routes';
console.log(routes)

function App() {
  return (
    <div className="App">
        {routes}
    </div>
  );
}

export default App;