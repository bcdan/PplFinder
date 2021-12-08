import React, { useState ,useEffect} from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link , useLocation } from 'react-router-dom'

const NavBar = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();

  const handleChange = (_e, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    if(location.pathname === '/')
      setValue(0);
    else setValue(1);
  },[value]);

  return (
    <AppBar position="static" color="transparent" style={{ position: "fixed", top: 0 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Home" component={Link} to='/' />
        <Tab label="Favorites" component={Link} to='/favorites'/>
      </Tabs>
    </AppBar>
  );
};

export default NavBar;
