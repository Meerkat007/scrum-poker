import React from 'react';
import {useRoom} from './hooks/useRoom';

export default function MembersDisplay() {
    const {
        guests,
        shouldShowEstimate
    } = useRoom();

    console.log('guests', guests);

    function renderGuests() {
        if (!guests) {
            return;
        }
        
        // sort the guests by name
        const guestNames = Object.keys(guests);
        guestNames.sort();
        return guestNames.map(name => {
            const {estimate} = guests[name];
            console.log('guest', guests[name])
            return (
                <div key={name + estimate}>
                    <div>{name}</div>
                    {shouldShowEstimate && estimate}
                    {!shouldShowEstimate && estimate && 'picked'}
                    {!shouldShowEstimate && !estimate && 'not picked'}
                </div>
            )
        })
    }

    return (
        <div id="member_display">
            {renderGuests()}
        </div>
    )
}