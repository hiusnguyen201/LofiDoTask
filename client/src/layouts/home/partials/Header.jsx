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
  Link,
} from "@mui/material";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import images from "~/assets/images";
import useAuth from "~/hooks/useAuth";
import { GithubNoColorIcon } from "~/assets/icons";

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
      className="fixed py-3 shadow-none"
      sx={{
        backgroundColor: "transparent",
        backgroundImage:
          "linear-gradient(180deg, rgba(66, 65, 65, .8), transparent)",
      }}
    >
      <Container maxWidth="xl">
        <Box className="flex justify-between items-center">
          <LinkRouter
            className="flex justify-between items-center"
            to={"/"}
          >
            <img width={70} src={images.logo} />
          </LinkRouter>

          <Box className="flex items-center gap-5">
            <Link
              target="_blank"
              href="https://github.com/hiusnguyen201"
              className="flex items-center no-underline relative hover:no-underline"
              sx={{
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: "0%",
                  height: "1px",
                  backgroundColor: "#fff",
                  bottom: "-4px",
                  left: 0,
                },
                "&:hover::after": {
                  width: "100%",
                  transition: "width .3s",
                },
                "&:not(:hover)::after": {
                  width: "0%",
                  transition: "width .3s",
                },
              }}
            >
              <GithubNoColorIcon />
              <Typography className="ml-1 text-white">Github</Typography>
            </Link>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} className="p-0">
                <Avatar
                  sx={{ bgcolor: "#ffb05c" }}
                  alt="Remy Sharp"
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>

            <Menu
              className="cursor-pointer mt-11"
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
                <MenuItem
                  className="min-w-40"
                  key={name}
                  onClick={handleClick}
                >
                  <Typography>{name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
}
export default Header;
