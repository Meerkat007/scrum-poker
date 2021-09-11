import React from 'react';


export const NameContext = React.createContext('');

export function useName() {
    const {name, setName} = React.useContext(NameContext);
    return {
        name,
        setName
    }
}

export default function NameProvider({children}) {
    const [name, setName] = React.useState('');

    return (
        <NameContext.Provider value={{
            name,
            setName
        }}>
            {children}
        </NameContext.Provider>
    )
}

