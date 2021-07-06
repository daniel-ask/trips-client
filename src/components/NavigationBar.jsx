import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AirlineSeatReclineExtraIcon from "@material-ui/icons/AirlineSeatReclineExtra";
import BathtubIcon from "@material-ui/icons/Bathtub";
import { Link } from "react-router-dom";
import { DanNav } from "../styled-components/StyledComponents";
import { AuthContext } from "../contexts/AuthProvider";

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function NavigationBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [auth, setAuth] = useContext(AuthContext);
  const signOut = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setAuth({
      loggedIn: false,
      username: null
    })
  }

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
    <DanNav>
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
    </DanNav>
  );
}
