import * as React from 'react';
import './inputs.css';

export default function InputsPa({ value, onChange, id, type, ...rest }) {
    return (
        <input 
            type={type} 
            className='inputs' 
            name="password" 
            id={id} 
            required 
            value={value} 
            onChange={onChange}
            {...rest}
        />
    );
}
