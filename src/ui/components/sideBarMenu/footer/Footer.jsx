import React, { useContext } from "react";
import { IoIosLogOut } from "react-icons/io";
import './footer.css';
import { AuthContext } from "../../../../services/AuthContext";

export default function FooterSideBar() {
    const { logout } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Erro ao deslogar:", error);
        }
    };

    return (
        <div className='footer'>
            <p>
                <IoIosLogOut 
                    cursor="pointer"
                    onClick={handleLogout}
                    style={{ color: "red", fontSize: "24px" }} // Corrigido o uso de 'sx' para 'style'
                />
            </p>
        </div>
    );
}
