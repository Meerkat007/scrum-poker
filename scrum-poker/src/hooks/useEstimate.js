import React from 'react';


export const EstimateContext = React.createContext('');

export function useEstimate() {
    const {estimatePicked, setEstimatePicked} = React.useContext(EstimateContext);
    return {
        estimatePicked,
        setEstimatePicked
    }
}

export default function EstimateProvider({children}) {
    const [estimatePicked, setEstimatePicked] = React.useState('');

    return (
        <EstimateContext.Provider value={{
            estimatePicked,
            setEstimatePicked
        }}>
            {children}
        </EstimateContext.Provider>
    )
}

