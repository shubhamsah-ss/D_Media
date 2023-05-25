import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import DataProvider from './redux/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DataProvider>
    <BrowserRouter>
      <App />
  </BrowserRouter>
  </DataProvider>
);


