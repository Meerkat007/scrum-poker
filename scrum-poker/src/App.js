import './App.css';
import React from 'react'
import {useName} from './hooks/useName';
import NameInputView from './NameInputView';
import {useRoom} from './hooks/useRoom';


/**
 * // input name then connect to room
 */

function App() {
  const {name} = useName();
  const {room} = useRoom();
  const [connected, setConnected] = React.useState('');

  React.useState(() => {
    

    
    // disconnect
  }, []);

  return (
    <div className="App">
      {!room && (
        <NameInputView />
      )}
      {room && (
        <div>joinedd</div>
      )}
    </div>
  );
}

export default App;
