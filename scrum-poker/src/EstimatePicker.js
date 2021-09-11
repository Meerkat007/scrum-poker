import React from 'react';
import {useName} from './hooks/useName';
import {socket, useRoom} from './hooks/useRoom';
import {socketClientConstants} from './socketClientConstants';

const ESTIMATES = [
    '30m',
    '1hr',
    '2hr',
    '4hr',
    '1d',
    '2d',
    '3d',
    '1w'
]

export default function EstimatePicker() {
    const [estimatePicked, setEstimatePicked] = React.useState();
    const {name} = useName();
    const {sendMessage} = useRoom();

    function handleCardClick(estimate) {
        setEstimatePicked(estimate);
        sendMessage(
            socket,
            {
            action: socketClientConstants.SUBMIT_ESTIMATE,
            value: {
                name,
                estimate
            }
        })
    }

    function renderCards() {
        return ESTIMATES.map(estimate => {
            return (
                <div key={estimate}>
                    <label>
                        <input
                            type="radio"
                            name="estimate"
                            vaue={estimate}
                            checked={estimate === estimatePicked}
                            onChange={() => handleCardClick(estimate)} 
                        />
                        {estimate}
                    </label>
                </div>
            )
        })
    }

    return (
        <div>
            {renderCards()}
        </div>
    )
}