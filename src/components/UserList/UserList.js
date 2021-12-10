import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import { useFavorites } from "hooks";
import {useLocation} from 'react-router-dom'

const UserList = ({ users, isLoading }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [checkedBoxes,setCheckedBoxes] = useState([]);
  const [filteredUsers,setFilteredUsers] = useState(users);
  const { favoriteUsers , setFavoriteUsers } = useFavorites();
  const location = useLocation();

  const COUNTRIES = [
    {nat:"BR",label:"Brazil"},
    {nat:"AU",label:"Australia"},
    {nat:"CA",label:"Canada"},
    {nat:"DE",label:"Germany"},
    {nat:"NO",label:"Norway"}
  ]

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  useEffect(()=>{
    //generate unique IDs for all users
    users.forEach((user)=>user["_id"]=(new Date()).getTime().toString(36) + Math.random().toString(36).slice(2));
    setFilteredUsers(users);
  },[users]);

  const handleToggle = (countryValue)=>{
      const currentIndex = checkedBoxes.indexOf(countryValue);
      const newCheckedBoxes = [...checkedBoxes];
      currentIndex === -1 ? newCheckedBoxes.push(countryValue) : newCheckedBoxes.splice(currentIndex,1);
      setCheckedBoxes(newCheckedBoxes);
      if(newCheckedBoxes.length == 0){
          setFilteredUsers(users);
          return;
      }
      const filteredResult = users.filter(user=>newCheckedBoxes.some(checkBox=>getCountryTag(user.location.country) == checkBox));
      setFilteredUsers(filteredResult);
  };

  const getCountryTag = (countryLabel)=>{
    const foundCountry = COUNTRIES.find((countryOBJ)=>{
        if(countryOBJ.label == countryLabel){
          return countryOBJ.nat;
        }
    });
    return foundCountry?.nat;
  }

  const isChecked = (country)=>{
      return checkedBoxes.indexOf(country) > -1;
  };


  const handleFavoriteClick = (user)=>{ 
    const favoriteIndex = favoriteUsers?.findIndex(userToFind=>userToFind._id === user._id);
    const newFavorites = [...(favoriteUsers instanceof Array ? favoriteUsers : [])];
    favoriteIndex === -1 ? newFavorites.push(user) : newFavorites.splice(favoriteIndex,1);
    setFavoriteUsers(newFavorites);
  };

  const handleFavoriteVisibility = (userID)=>{
    if(!favoriteUsers)
      setFavoriteUsers([]);
    return favoriteUsers?.some(favorite=>favorite._id == userID);
  }



  return (
    <S.UserList>
      {location.pathname === '/' ? 
      <S.Filters>
        {COUNTRIES.map((country,index)=>{
          return (
          <CheckBox 
            key={index} 
            isChecked={isChecked(country.nat)} 
            onChange={handleToggle} 
            value={country.nat} 
            label={country.label} />
          );
        })}
      </S.Filters>
      : null
      }
      <S.List >
        {(location.pathname === '/' ? filteredUsers : favoriteUsers)?.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper onClick={()=>{handleFavoriteClick(user)}} isVisible={index === hoveredUserId || handleFavoriteVisibility(user._id)}>
                <IconButton>
                  <FavoriteIcon  color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
