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
          <LinkRouter
            style={{
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
            }}
            to={"/"}
          >
            <img width={70} src={images.logo} />
          </LinkRouter>

          <Box display={"flex"} alignItems={"center"} gap={5}>
            <Link
              target={"_blank"}
              href={"https://github.com/hiusnguyen201"}
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                position: "relative",
                "&:hover": {
                  textDecoration: "none",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: "0%",
                  height: "2px",
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
              <GithubNoColorIcon width={"36px"} height={"36px"} />
              <Typography
                sx={{
                  ml: 1,
                  color: "#fff",
                }}
              >
                Github
              </Typography>
            </Link>

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
                <MenuItem
                  sx={{ minWidth: 150 }}
                  key={name}
                  onClick={handleClick}
                >
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
