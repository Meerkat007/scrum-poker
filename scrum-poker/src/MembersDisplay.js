import React from 'react';
import {useRoom} from './hooks/useRoom';

export default function MembersDisplay() {
    const {guests} = useRoom();

    function renderGuests() {
        if (!guests) {
            return;
        }
        
        // sort the guests by name
        const guestNames = Object.keys(guests);
        guestNames.sort();
        return guestNames.map(name => {
            const {estimate} = guests[name];

            return (
                <div key={name + estimate}>
                    <div>{name}</div>
                    {estimate}
                </div>
            )
        })
    }

    return (
        <div>
            {renderGuests()}
        </div>
    )
}