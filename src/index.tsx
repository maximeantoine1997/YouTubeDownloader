import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css"
import { SnackbarProvider } from "notistack"

ReactDOM.render(
  <div style={{margin: 0, padding: 0}}>
    <SnackbarProvider autoHideDuration={2000} anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
    }}>
      <App />
    </SnackbarProvider>
  </div>,
  document.getElementById('root')
);

