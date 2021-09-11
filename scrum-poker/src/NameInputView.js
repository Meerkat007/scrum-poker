import React from 'react';
import {useName} from './hooks/useName';
import {useRoom} from './hooks/useRoom';
import {getQueryVariable} from './utils';

export default function NameInputView() {
    const {name, setName} = useName();
    const {connectToRoom} = useRoom();

    function handleNameChange(event) {
        const name = event.target.value.trim();
        setName(() => name);
    }
    
    function handleSubmission() {
        const roomId = getQueryVariable('roomId');
        connectToRoom(
            roomId,
            name
        )
        // send name to websocket
        // once submission worked, update view to poker view
    }

    return (
        <div>
            <label htmlFor="name-input">
                Please enter your name
            </label>
            <input
                id="name-input"
                type="text"
                value={name}
                onChange={handleNameChange}
            />
            <button
                onClick={handleSubmission}
            >Submit</button>
        </div>
    )
}