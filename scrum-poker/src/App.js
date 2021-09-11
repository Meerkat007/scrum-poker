import './App.css';
import React from 'react'
import {useName} from './hooks/useName';
import NameInputView from './NameInputView';
import {useRoom} from './hooks/useRoom';
import Room from './Room';


/**
 * // input name then connect to room
 */

function App() {
  const {room} = useRoom();

  React.useState(() => {
    

    
    // disconnect
  }, []);

  return (
    <div className="App">
      {!room && (
        <NameInputView />
      )}
      {room && (
        <Room />
      )}
    </div>
  );
}

export default App;
