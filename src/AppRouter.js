import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home , Favorites} from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";
import { usePeopleFetch } from "hooks";
import { UsersContext } from "hooks/UsersContext";

const AppRouter = () => {
  const { users, isLoading } = usePeopleFetch();

  return (
    <ThemeProvider>
      <Router>
        <NavBar />
        <Switch>
          <UsersContext.Provider value={{users,isLoading}}>
          <Route exact path="/" component={Home} users={users} isLoading={isLoading} />
          <Route exact path="/Favorites" component={Favorites} />
          </UsersContext.Provider>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
