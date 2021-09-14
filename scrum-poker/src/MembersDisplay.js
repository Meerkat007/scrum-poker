import React from 'react';
import {useName} from './hooks/useName';
import {useRoom} from './hooks/useRoom';
import './MembersDisplay.css';

export default function MembersDisplay() {
    const {
        guests,
        shouldShowEstimate
    } = useRoom();

    const {name} = useName();

    function renderGuests() {
        if (!guests) {
            return;
        }
        
        // sort the guests by name
        const renderedGuests = [];
        let index = 0;
        guests.forEach((info, name) => {
            index++;
            const {estimate} = info;
            const pickedCardClassNames = ['member_card'];
            if (!shouldShowEstimate && estimate) {
                pickedCardClassNames.push('picked');
            } else if (!shouldShowEstimate && !estimate) {
                pickedCardClassNames.push('not_picked');
            }

            const memberClassNames = [
                'member',
                'member_' + index
            ];

            renderedGuests.push(
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
        return renderedGuests;
    }

    function getStatusMessage() {
        let hasEveryoneVoted = true;
        let hasIVoted = false;

        if (!guests) {
            return 'Waiting for team members to join.'
        }

        guests.forEach((info, guestName) => {
            const {estimate} = info;
            hasEveryoneVoted = hasEveryoneVoted && Boolean(estimate);
            hasIVoted = hasIVoted || (estimate && guestName === name);
        })
        
        if (!hasIVoted) {
            return 'Waiting for you to provide an estimate';
        } 
        if (hasIVoted && !hasEveryoneVoted) {
            return 'Waiting for others to provide estimates';
        }
        if (hasEveryoneVoted) {
            return 'Everyone has provided estimate';
        }
    }

    return (
        <div id="member_display">
            <div className="table">
                <div className="scrum_status">
                    {getStatusMessage()}
                </div>
            </div>
            {renderGuests()}
        </div>
    )
}