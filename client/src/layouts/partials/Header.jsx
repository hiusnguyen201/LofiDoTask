import { useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Typography,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Menu,
  Stack,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import images from "~/assets/images";
import useAuth from "~/hooks/useAuth";

function Header() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    {
      name: "Profile",
      handleClick: () => {},
    },
    {
      name: "Account",
      handleClick: () => {},
    },
    {
      name: "Logout",
      handleClick: async () => {
        await logout();
        toast.success("Logout success");
        navigate("/auth/login");
      },
    },
  ];

  return (
    <AppBar
      sx={{
        padding: "12px 0",
        backgroundColor: "transparent",
        boxShadow: "none",
        backgroundImage:
          "linear-gradient(180deg, rgba(66, 65, 65, .8), transparent)",
      }}
      position="fixed"
    >
      <Container maxWidth="xl">
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Link
            style={{
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
            }}
            to={"/"}
          >
            <img width={60} src={images.logo} />
          </Link>

          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{ bgcolor: "#ffb05c" }}
                  alt="Remy Sharp"
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px", cursor: "pointer" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(({ name, handleClick }) => (
                <MenuItem key={name} onClick={handleClick}>
                  <Typography textAlign="center">{name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Stack>
      </Container>
    </AppBar>
  );
}
export default Header;
