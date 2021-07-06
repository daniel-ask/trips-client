import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
// import { DanNav } from "../styled-components/StyledComponents";
import { AuthContext } from "../contexts/AuthProvider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import EnhancedEncryptionOutlinedIcon from "@material-ui/icons/EnhancedEncryptionOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavigationBar() {
  const classes = useStyles();
  const [auth, setAuth] = useContext(AuthContext);
  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setAuth({
      loggedIn: false,
      username: null,
    });
  };

  return (
    // <BottomNavigation
    //   value={value}
    //   onChange={(event, newValue) => {
    //     setValue(newValue);
    //   }}
    //   showLabels
    //   className={classes.root}
    // >
    //   <Link to="/">
    //     <BottomNavigationAction label="Home" icon={<HomeIcon />} />
    //   </Link>
    //   <Link to="/login">
    //     <BottomNavigationAction
    //       label="Login"
    //       icon={<AirlineSeatReclineExtraIcon />}
    //     />
    //   </Link>
    //   <Link to="/sign-up">
    //     <BottomNavigationAction label="Sign Up" icon={<BathtubIcon />} />
    //   </Link>
    // </BottomNavigation>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Trips
        </Typography>
        {auth.loggedIn ? (
          <>
            <Typography variant="subtitle1">
              Logged in as: {auth.username}
            </Typography>
            <Button color="inherit" onClick={signOut}>
            Sign out
            </Button>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              startIcon={<LockOutlinedIcon />}
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              color="inherit"
              startIcon={<EnhancedEncryptionOutlinedIcon />}
              component={Link}
              to="/sign-up"
            >
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}


  /* <DanNav>
      <Link to="/">Home</Link>
      {auth.loggedIn ? (
        <>
          <h2>Logged in as: {auth.username}</h2>
          <div onClick={signOut}>Sign out</div>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/sign-up">Sign Up</Link>
        </>
      )}
    </DanNav> */

