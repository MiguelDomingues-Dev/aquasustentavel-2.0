import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../services/AuthContext";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../services/firebase";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

export default function AccountMenu() {
    const { logout } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState("Carregando...");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                const userUID = user.uid;

                try {
                    const q = query(collection(db, "users"), where("uid", "==", userUID));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const userData = querySnapshot.docs[0].data();
                        setUserName(userData.nameUser);
                    } else {
                        setUserName("Usuário não encontrado");
                    }
                } catch (error) {
                    console.error("Erro ao buscar usuário:", error);
                    setUserName("Erro ao carregar");
                }
            } else {
                setUser(null);
                setUserName("Nenhum usuário logado");
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        handleClose();
        try {
            await logout();
        } catch (error) {
            console.error("Erro ao deslogar:", error);
        }
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    
    const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
        color: "#fff",
        borderRadius: "8px",
        padding: "10px 20px",
        transition: "0.3s",
        "&:hover": {
            backgroundColor: "gray",
            color: "white",
        }
    }));

    return (
        <React.Fragment>
            <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                <Tooltip title="Configurações da Conta">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <Avatar src={user?.photoURL || ""} sx={{ width: 32, height: 32 }} />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            backgroundColor: "#081623",
                            color: "#fff",
                            overflow: "visible",
                            border: "1px solid rgba(0, 178, 27, 0.69)",
                            filter: "drop-shadow(0px 0px 20px rgba(148, 148, 148, 0.18))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            "&::before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "rgba(0, 178, 27, 0.69)",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem sx={
                    {
                        cursor: "arrow"
                    }
                }>
                    <Avatar src={user?.photoURL || ""} /> 
                    <p>@{userName ? userName : "Carregando..."}</p>
                </MenuItem>
                <Divider />
                <CustomMenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <PersonAdd sx={{color: "#fff"}} fontSize="small" />
                    </ListItemIcon>
                    Adicionar outra conta
                </CustomMenuItem>
                <CustomMenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings sx={{color: "#fff"}} fontSize="small" />
                    </ListItemIcon>
                    Configurações
                </CustomMenuItem>
                <CustomMenuItem onClick={handleLogout} sx={{
                    color: "red"
                }}>
                    <ListItemIcon>
                        <Logout sx={{color: "red"}} fontSize="small" />
                    </ListItemIcon>
                    Logout
                </CustomMenuItem>
            </Menu>
        </React.Fragment>
    );
}
