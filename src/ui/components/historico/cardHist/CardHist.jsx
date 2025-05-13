import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { IconButton, Menu, MenuItem } from "@mui/material";
import "./cardHist.css";

export default function CardHist({ date, consumption, onShowDetails }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div className="containerCardHist">
      <div className="infoConsumo">
        <p className="date">{date}</p>
        <p className="titleConsumo">Consumo Total</p>
      </div>

      <div className="valueConsumo">{consumption} L</div>

      <IconButton
        size="small"
        onClick={handleClick}
        sx={{ color: "white" }}
      >
        <BsThreeDots fontSize="1.4rem" />
      </IconButton>

      {/* pop‑up */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
            onShowDetails(date);
          }}
        >
          Ver detalhes
        </MenuItem>
      </Menu>
    </div>
  );
}
