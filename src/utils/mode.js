import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';

const mode = createContext();
export const useMode = () => useContext(mode); 
export default function ModeProvider ({defaultValue, children}) {
    const [value, setValue] = useState(defaultValue);
    return (
        <mode.Provider 
            value={[value, setValue]}
        >{children}</mode.Provider>
    )
}

ModeProvider.propTypes = {
    defaultValue: PropTypes.oneOf([
        'default', 
        'scaling',
        'line',
        'polygon',
        'nodes',
        'clear'
    ])
}

ModeProvider.defaultProps = {
    defaultValue: 'default',
}