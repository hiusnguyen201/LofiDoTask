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
import { Link as LinkRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "~/redux/slices/authSlice";
import images from "~/assets/images";
import { GithubNoColorIcon } from "~/assets/icons";

function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
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
      handleClick: () => {
        dispatch(logout());
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
              className="flex items-center smooth-underline"
            >
              <GithubNoColorIcon className="text-xl" />
              <Typography className="ml-1 text-white">Github</Typography>
            </Link>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} className="p-0">
                <Avatar
                  className="font-bold text-white"
                  sx={{
                    background: "linear-gradient(#403294, #0747a6)",
                  }}
                  alt={user.username.toUpperCase()}
                  src="none"
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
