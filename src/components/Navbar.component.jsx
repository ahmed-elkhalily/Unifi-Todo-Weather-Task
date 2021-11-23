import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../App";

// icons
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CloudIcon from "@mui/icons-material/Cloud";

const Navbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Box sx={{ flexGrow: 1 }} mb={4}>
      <AppBar position="static" sx={{ margin: (theme) => theme.spacing(0) }}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            component={Link}
            to="/"
          >
            <ListAltIcon />
          </IconButton>
          <Box>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              component={Link}
              to="weather"
            >
              <CloudIcon />
            </IconButton>

            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
