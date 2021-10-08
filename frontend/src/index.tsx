import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);
