import { useState, useEffect } from "react";

export const useFavorites = () => {
  const [favoriteUsers,setFavoriteUsers] = useState(()=>{
    const favoriteUsersFromLocalStorage = window.localStorage.getItem("favorites");
    let favoriteUsersList = '[]';
    if(favoriteUsersFromLocalStorage ){
      favoriteUsersList = favoriteUsersFromLocalStorage;
    }
    return JSON.parse(favoriteUsersList);
  });


  useEffect(()=>{
    window.localStorage.setItem("favorites",JSON.stringify(favoriteUsers));
  },[favoriteUsers])


  return { favoriteUsers , setFavoriteUsers };
};
