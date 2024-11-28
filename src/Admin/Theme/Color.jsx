import React from "react";
import DarkModeIcon from "@mui/icons-material/DarkModeRounded";
import LightModeIcon from "@mui/icons-material/LightModeRounded";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness"; // Icon for system mode
// import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function Color({ mode, setMode }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMode = (targetMode) => () => {
    setMode(targetMode);
    handleClose();
  };

  const icon = {
    light: <LightModeIcon />,
    dark: <DarkModeIcon />,
    system: <SettingsBrightnessIcon />,
  }[mode];

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? "color-scheme-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        {icon}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{
          display: "sticky",
        }}
      >
        <MenuItem selected={mode === "system"} onClick={handleMode("system")}>
          System Default
        </MenuItem>
        <MenuItem selected={mode === "light"} onClick={handleMode("light")}>
          Light
        </MenuItem>
        <MenuItem selected={mode === "dark"} onClick={handleMode("dark")}>
          Dark
        </MenuItem>
      </Menu>
    </>
  );
}
