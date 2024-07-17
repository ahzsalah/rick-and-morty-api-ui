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
  const { logout } = useAuth();
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
        <Toolbar className="toolbar">
          <Box className="toolbar-contents navbar-menu">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box className="toolbar-contents navbar-title">
            <Typography variant="h6" component="div">
              Rick and Morty
            </Typography>
          </Box>
          <Box className="toolbar-contents box-buttons">
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
          </Box>
          <IconButton color="inherit" onClick={handleFavoriteClick}>
            <FavoriteIcon />
          </IconButton>
          <Button
            color="inherit"
            onClick={handleLogout}
            style={{ marginLeft: "auto" }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
