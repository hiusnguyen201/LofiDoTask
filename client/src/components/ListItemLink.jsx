import { NavLink } from "react-router-dom";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

const handleClick = () => {};

export default function ListItemLink({
  to,
  primary,
  icon,
  lastIcon,
  onLastIconClick = handleClick,
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "active hover:no-underline" : "hover:no-underline"
      }
    >
      <ListItemButton>
        {icon && <ListItemIcon className="mr-2" children={icon} />}
        <ListItemText primary={primary} />
        {lastIcon && (
          <ListItemButton onClick={onLastIconClick} children={lastIcon} />
        )}
      </ListItemButton>
    </NavLink>
  );
}
