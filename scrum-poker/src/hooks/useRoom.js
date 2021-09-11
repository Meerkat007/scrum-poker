import React from 'react';
import {getQueryVariable} from '../utils';


export const RoomContext = React.createContext('');

export function useRoom() {
    const {room, setRoom, connectToRoom} = React.useContext(RoomContext);
    return {
        room,
        setRoom,
        connectToRoom
    }
}

export default function RoomProvider({children}) {
    const [room, setRoom] = React.useState('');
    let socket;

    function connectToRoom(roomId, teamMemberName) {
        socket = new WebSocket(
            "ws://localhost:8080/?roomId=" + roomId
        );

        socket.onmessage = function (event) {
            const {data} = event;
            if (data === 'connected') {
                setRoom(true);
            }

            // someone left

            // someone voted

            // reset round
          }
    }

    return (
        <RoomContext.Provider value={{
            room,
            setRoom,
            connectToRoom
        }}>
            {children}
        </RoomContext.Provider>
    )
}

