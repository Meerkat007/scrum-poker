import React from 'react';
import {useName} from './hooks/useName';
import {socket, useRoom} from './hooks/useRoom';
import {socketClientConstants} from './socketClientConstants';
import './EstimatePicker.css';

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
            const labelClassNames = [];
            const isChecked = estimate === estimatePicked;
            if (isChecked) {
                labelClassNames.push("is_checked");
            }
            return (
                <div 
                    className="card" 
                    key={estimate}
                >
                    <div className="card_content">
                    <label className={labelClassNames.join(' ')}>
                        <input
                            type="radio"
                            name="estimate"
                            vaue={estimate}
                            checked={isChecked}
                            onChange={() => handleCardClick(estimate)} 
                        />
                        {estimate}
                    </label>
                    </div>
                </div>
            )
        })
    }

    return (
        <div id="estimate_picker">
            {renderCards()}
        </div>
    )
}