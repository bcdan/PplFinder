import { useState, useEffect } from "react";

export const useFavorites = () => {
  const [favoriteUsers,setFavoriteUsers] = useState([]); 

  //save favorite users on localStorage
  useEffect(()=>{
    const localStorageData = window.localStorage.getItem("favorites");
    favoriteUsers && setFavoriteUsers(JSON.parse(localStorageData));
  },[]);

  useEffect(()=>{
    window.localStorage.setItem("favorites",JSON.stringify(favoriteUsers));
  },[favoriteUsers])


  return { favoriteUsers , setFavoriteUsers };
};
