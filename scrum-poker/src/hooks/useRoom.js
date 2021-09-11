import React from 'react';
import {socketClientConstants} from '../socketClientConstants';
import {getWsData} from '../utils';
import {useName} from './useName';


export const RoomContext = React.createContext('');

export function useRoom() {
    return React.useContext(RoomContext);
}

export let socket;

export default function RoomProvider({children}) {
    const {name} = useName();
    const [room, setRoom] = React.useState('');
    const [guests, setGuests] = React.useState();

    function connectToRoom(roomId, teamMemberName) {
        socket = new WebSocket(
            "ws://localhost:8080/?roomId=" + roomId +
            "&memberName=" + teamMemberName
        );

        socket.onmessage = function (event) {
            const {data} = event;
            const {action, value} = getWsData(data);

            if (action === socketClientConstants.NEW_MEMBER_JOINED) {
                const guests = value;
                setRoom(roomId);
                setGuests(guests);
            }

            // someone left

            // someone voted

            // reset round
          }
    }

    function sendMessage(socket, message) {
        console.log('sendmessage', socket)
        socket && socket.send(JSON.stringify(message));
    }

    function terminateSocket() {
        console.log('socket send');
        socket.send(
            JSON.stringify({
                action:  socketClientConstants.MEMBER_LEFT,
                value: {
                    roomId: room,
                    memberName: name
                }
            })
        );
    }

    return (
        <RoomContext.Provider value={{
            room,
            setRoom,
            connectToRoom,
            guests,
            setGuests,
            sendMessage,
        }}>
            {children}
        </RoomContext.Provider>
    )
}

