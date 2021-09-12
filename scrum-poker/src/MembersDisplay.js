import React from 'react';
import {useRoom} from './hooks/useRoom';
import './MembersDisplay.css';

export default function MembersDisplay() {
    const {
        guests,
        shouldShowEstimate
    } = useRoom();

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
        let hasEveryoneVoted = false;
        if (hasEveryoneVoted) {
            return 'Ready to reveal the estimates';
        } else {
            return 'Waiting for everyone\'s estimate...';
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