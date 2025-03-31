import * as React from 'react';
import './inputs.css';

export default function InputsLa({ value, onChange, id, ...rest }) {
    return (
        <input 
            type="text" 
            className='inputs' 
            name="email" 
            id={id} 
            required 
            value={value} 
            onChange={onChange}
            {...rest}
        />
    );
}
