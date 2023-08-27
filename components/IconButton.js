import { IconButton } from "@mui/material";

const CustomIconButton = ({ icon, onClick, size }) => {
  return (
    <IconButton size={size} onClick={onClick}>
      {icon}
    </IconButton>
  );
};

export default CustomIconButton;
