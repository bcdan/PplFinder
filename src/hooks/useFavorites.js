import { useState, useEffect } from "react";

export const useFavorites = () => {
  const [favoriteUsers,setFavoriteUsers] = useState(()=>{
    const localStorageUsers = window.localStorage.getItem("favorites");
    if(localStorageUsers ){
      return JSON.parse(localStorageUsers);
    }
    return [];
  });


  useEffect(()=>{
    window.localStorage.setItem("favorites",JSON.stringify(favoriteUsers));
  },[favoriteUsers])


  return { favoriteUsers , setFavoriteUsers };
};
