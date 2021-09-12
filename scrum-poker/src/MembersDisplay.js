import React from 'react';
import {useRoom} from './hooks/useRoom';
import './MembersDisplay.css';

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
        return guestNames.map((name, index) => {
            const {estimate} = guests[name];
            const pickedCardClassNames = ['member_card'];
            if (!shouldShowEstimate && estimate) {
                pickedCardClassNames.push('picked');
            } else if (!shouldShowEstimate && !estimate) {
                pickedCardClassNames.push('not_picked');
            }

            const memberClassNames = [
                'member',
                'member_' + (index + 1)
            ];

            return (
                <div
                    key={name + estimate}
                    className={memberClassNames.join(' ')}
                >
                    <div className="member_name">{name}</div>
                    <div className={pickedCardClassNames.join(' ')}>
                        {shouldShowEstimate && (
                            <div className="member_estimate">
                                {estimate}
                            </div>
                        )}
                    </div>
                </div>
            )
        })
    }

    return (
        <div id="member_display">
            <div className="table" />
            {renderGuests()}
        </div>
    )
}