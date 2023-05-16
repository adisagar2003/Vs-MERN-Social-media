import axios from "axios";
import { useCookies } from "react-cookie";
import Cookies from "universal-cookie";

export const currentUserId: string = JSON.parse(
  sessionStorage.getItem("userData") || "{}"
)._id;
export const currentUserData: any = JSON.parse(
  sessionStorage.getItem("userData") || "{}"
);
export const currentUserToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies();

  return cookies.accessToken;
};
