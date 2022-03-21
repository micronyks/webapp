import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import './index.css';

// custom imports
import App from "./App";


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("webapp-container")
);