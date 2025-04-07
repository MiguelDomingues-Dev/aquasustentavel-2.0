import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { VscGraph } from "react-icons/vsc";
import { FaGear } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { HiOutlineSignal } from "react-icons/hi2";

export default function HamburgerMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false); // Fecha o menu após a navegação
  };

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)} edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button onClick={() => handleNavigation('/overview')} className={location.pathname === '/overview' ? 'active' : ''}>
            <ListItemIcon>
              <IoHome />
            </ListItemIcon>
            <ListItemText primary="Overview" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/analytics')} className={location.pathname === '/analytics' ? 'active' : ''}>
            <ListItemIcon>
              <VscGraph />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/settings')} className={location.pathname === '/settings' ? 'active' : ''}>
            <ListItemIcon>
              <FaGear />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/aditionIot')} className={location.pathname === '/aditionIot' ? 'active' : ''}>
            <ListItemIcon>
              <HiOutlineSignal />
            </ListItemIcon>
            <ListItemText primary="IoT" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
