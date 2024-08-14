import { NavLink } from "react-router-dom";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export default function ListItemLink({ to, primary, icon, lastIcon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "active hover:no-underline" : "hover:no-underline"
      }
    >
      <ListItemButton>
        {icon && <ListItemIcon children={icon} />}
        <ListItemText primary={primary} />
        {lastIcon && <ListItemButton children={lastIcon} />}
      </ListItemButton>
    </NavLink>
  );
}
