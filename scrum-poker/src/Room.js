import React from 'react';
import EstimatePicker from './EstimatePicker';
import {useName} from './hooks/useName';
import {socket, useRoom} from './hooks/useRoom';
import MembersDisplay from './MembersDisplay';
import {socketClientConstants} from './socketClientConstants';

export default function Room() {
    const {
        sendMessage, 
        shouldShowEstimate, 
    } = useRoom();
    const {name} = useName()
    const isHost = name === 'Yuan';

    function showEstimateButtonClick() {
        const result = !shouldShowEstimate;
        sendMessage(
            socket,
            {
                action: socketClientConstants.UPDATE_ESTIMATE_DISPLAY_STATE,
                value: result
            }    
        )
    }

    return (
        <div>
            <MembersDisplay />
            <EstimatePicker />
            {isHost && (
                <button 
                    onClick={showEstimateButtonClick}
                >
                    {shouldShowEstimate 
                        ? 'Reset'
                        : 'Show Estimate'
                    } 
                </button>
            )}
        </div>
    )
}