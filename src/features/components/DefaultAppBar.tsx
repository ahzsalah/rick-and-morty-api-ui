import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "../../contexts/AuthContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

export default function DefaultAppBar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    navigate("/favorites");
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch {
      console.error("Failed to log out");
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar className="app-bar">
        <Toolbar className="tool-bar">
          <Box className="toolbar-contents" sx={{ flexGrow: 1 }}>
            <IconButton
              className="navbar-menu"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Typography
            className="navbar-title"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Rick and Morty
          </Typography>

          <Box
            className="toolbar-contents"
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {currentUser ? (
              <>
                <Button
                  className="box-button"
                  component={Link}
                  to="/"
                  color="inherit"
                >
                  Home
                </Button>
                <Button
                  className="box-button"
                  component={Link}
                  to="/characters"
                  color="inherit"
                >
                  Characters
                </Button>
                <IconButton color="inherit" onClick={handleFavoriteClick}>
                  <FavoriteIcon />
                </IconButton>
                <Typography
                  className="user-email-navbar"
                  variant="body1"
                  color="inherit"
                  sx={{
                    ml: 2,
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  {currentUser.email}
                </Typography>
                <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
                  Logout
                </Button>
              </>
            ) : (
              <Button
                className="box-button"
                component={Link}
                to="/login"
                color="inherit"
                sx={{ ml: 2 }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
