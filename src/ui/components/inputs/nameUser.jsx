import * as React from 'react';
import './inputs.css';

export default function NameUser({ value, onChange, id, ...rest }) {
    return (
        <input 
            type="text" 
            className='inputs' 
            name="nameUser" 
            id={id} 
            required 
            value={value}
            onChange={onChange}
            {...rest}
        />
    );
}
