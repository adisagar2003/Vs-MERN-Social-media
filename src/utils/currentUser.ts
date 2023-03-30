import axios from "axios";
import { useCookies } from "react-cookie";
import Cookies from "universal-cookie";

export const currentUserId:string = JSON.parse(sessionStorage.getItem("userData") ||'{}')._id;

export const currentUserToken = ()=>{
    const [cookies, setCookie, removeCookie]  = useCookies();


    return cookies.accessToken
}