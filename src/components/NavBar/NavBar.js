import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link , useLocation } from 'react-router-dom'

const NavBar = () => {
  const location = useLocation();
  const [value, setValue] = useState(()=>{
    if(location.pathname === '/')
      return 0;
    return 1;
  });
  const handleChange = (_e, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static" color="transparent" style={{ position: "fixed", top: 0 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Home" component={Link} to='/'/> 
        <Tab label="Favorites" component={Link} to='/favorites'/>
      </Tabs>
    </AppBar>
  );
};

export default NavBar;
