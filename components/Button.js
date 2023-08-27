import { Button } from "@mui/material";
import { useState } from "react";

const CustomButton = ({
  text,
  startIcon,
  endIcon,
  bgColor,
  color,
  onHoverColor,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        color: color,
        backgroundColor: bgColor,
        fontWeight: 600,
        "&:hover": {
          backgroundColor: onHoverColor,
        },
      }}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
