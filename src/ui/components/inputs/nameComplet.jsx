import * as React from 'react';
import './inputs.css';

export default function NameComplett({ value, onChange, id, ...rest }) {
    return (
        <input 
            type="text" 
            className='inputs' 
            name="nameComplett" 
            id={id} // ID fixo ou passado via props
            required 
            value={value} // Agora recebendo valor da prop
            onChange={onChange} // Agora recebendo função da prop
            {...rest} // Outras propriedades opcionais
        />
    );
}
