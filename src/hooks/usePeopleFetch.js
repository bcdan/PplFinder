import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setIsLoading(true);
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=1`);
    setIsLoading(false);
    response.data.results.forEach((user)=>user["_id"]=(new Date()).getTime().toString(36) + Math.random().toString(36).slice(2));
    setUsers(response.data.results);
  }

  return { users, isLoading, fetchUsers };
};
