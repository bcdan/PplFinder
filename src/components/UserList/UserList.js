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
  const [filteredUsers,setFilteredUsers] = useState(users); // we don't wanna mutate the original users prop
  const { favoriteUsers , setFavoriteUsers } = useFavorites();
  const location = useLocation();

  const COUNTRY_TAGS = ["BR","AU","CA","DE","NO"];
  const COUNTRY_LABELS = ["Brazil", "Australia" , "Canada" , "Germany" , "Norway"];

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  useEffect(()=>{
    //generate unique IDs for all users
    users.forEach((user)=>user["_id"]=(new Date()).getTime().toString(36) + Math.random().toString(36).slice(2)); //each user object will have a unique id
    setFilteredUsers(users);
  },[users]);

  const handleToggle = (countryValue)=>{
      const currentIndex = checkedBoxes.indexOf(countryValue);
      const newCheckedBoxes = [...checkedBoxes];
      currentIndex === -1 ? newCheckedBoxes.push(countryValue) : newCheckedBoxes.splice(currentIndex,1);
      setCheckedBoxes(newCheckedBoxes);
      if(newCheckedBoxes.length == 0){ // if there are no checked boxes - show all users
          setFilteredUsers(users);
          return;
      }
      const filteredResult = users.filter(user=>newCheckedBoxes.some(checkBox=>user.nat == checkBox)); //TODO : change to country instead of nationality
      setFilteredUsers(filteredResult);

  };

  
  const isChecked = (country)=>{
      return checkedBoxes.indexOf(country) === -1 ? false:true; // if the index is -1 then the box is not checked
  };


  const handleFavoriteClick = (user)=>{ 
    const favoriteIndex = favoriteUsers?.findIndex(userToFind=>userToFind._id === user._id);
    const newFavorites = [...(favoriteUsers instanceof Array ? favoriteUsers : [])];
    favoriteIndex === -1 ? newFavorites.push(user) : newFavorites.splice(favoriteIndex,1);
    setFavoriteUsers(newFavorites);
  };



  return (
    <S.UserList>
      {location.pathname==='/' ? 
      <S.Filters>
        {COUNTRY_TAGS.map((tag,index)=>{
          return (
          <CheckBox 
            key={index} 
            isChecked={isChecked(tag)} 
            onChange={handleToggle} 
            value={tag} 
            label={COUNTRY_LABELS[index]} />
          );
        })}
      </S.Filters>
      : null
      }
      <S.List >
        {(location.pathname === '/' ? filteredUsers : favoriteUsers).map((user, index) => {
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
              <S.IconButtonWrapper onClick={()=>{handleFavoriteClick(user)}} isVisible={index === hoveredUserId || favoriteUsers.some(favorite=>favorite._id == user._id)}>
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
