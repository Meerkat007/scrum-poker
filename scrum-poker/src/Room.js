import React from 'react';
import EstimatePicker from './EstimatePicker';
import {useRoom} from './hooks/useRoom';
import MembersDisplay from './MembersDisplay';

export default function Room() {

    return (
        <div>
            <MembersDisplay />
            <EstimatePicker />
        </div>
    )
}