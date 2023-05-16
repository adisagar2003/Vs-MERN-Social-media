import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
export const useFetch = (url: string) => {
  const [usersData, setUsersData] = useState<Array<object>>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [cookies] = useCookies();
  function fetchData() {
    axios
      .get(`${url}`, {
        headers: {
          authorization: `Bearer ${cookies.accessToken}`,
        },
      })
      .then((response) => {
        setUsersData(response.data.data);
        console.log(response);
        setLoadingUsers(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoadingUsers(false);
      });
  }

  useEffect(() => {
    fetchData();
    console.log(usersData, loadingUsers, error);
  }, [loadingUsers]);

  return { usersData, loadingUsers, error };
};
