import * as React from 'react';
import { IoIosLogOut } from "react-icons/io";
import './footer.css';

export default function FooterSideBar() {
    return(
        <div className='footer'>
            <p>
                <IoIosLogOut 
                    cursor="pointer"
                />
            </p>
        </div>
    );
}