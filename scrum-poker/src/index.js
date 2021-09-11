import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NameProvider from './hooks/useName';
import RoomProvider from './hooks/useRoom';
import EstimateProvider from './hooks/useEstimate';

ReactDOM.render(
  <React.StrictMode>
    <EstimateProvider>
    <RoomProvider>
      <NameProvider>
        <App />
      </NameProvider>
    </RoomProvider>
    </EstimateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
