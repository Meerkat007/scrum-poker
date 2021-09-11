import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NameProvider from './hooks/useName';
import RoomProvider from './hooks/useRoom';

ReactDOM.render(
  <React.StrictMode>
    <RoomProvider>
      <NameProvider>
        <App />
      </NameProvider>
    </RoomProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
