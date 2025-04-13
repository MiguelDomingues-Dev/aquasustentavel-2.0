import * as React from 'react';
import './button.css';

export default function Button({ children, style }) {
    return (
        <button className='button' type="submit" style={style}>
            {children}
        </button>
    );
}
