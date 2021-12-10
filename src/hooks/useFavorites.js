import { useState, useEffect } from "react";

export const useFavorites = () => {
  const [favoriteUsers,setFavoriteUsers] = useState([]); 

  //save favorite users on localStorage
  useEffect(()=>{
    const favoriteUsersFromLocalStorage = window.localStorage.getItem("favorites");
    let favoriteUsersList = [];
    if(favoriteUsersFromLocalStorage && favoriteUsers){
      favoriteUsersList = favoriteUsersFromLocalStorage;
    }
    setFavoriteUsers(JSON.parse(favoriteUsersList));
  },[]);

  useEffect(()=>{
    window.localStorage.setItem("favorites",JSON.stringify(favoriteUsers));
  },[favoriteUsers])


  return { favoriteUsers , setFavoriteUsers };
};
