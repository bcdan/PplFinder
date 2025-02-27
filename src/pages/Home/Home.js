import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import * as S from "./style";
import {useContext} from 'react';
import { UsersContext } from "hooks/UsersContext";

const Home = () => {
  const {users,isLoading} = useContext(UsersContext);

  const getUsersWithFavorites = ()=>{
    const localStorageUsers = window.localStorage.getItem("favorites");
    if(localStorageUsers)
        return [...users,...JSON.parse(localStorageUsers)];
    return users;
  }

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList users={getUsersWithFavorites()} isLoading={isLoading} />
      </S.Content>
    </S.Home>
  );
};

export default Home;
