import type { PathRouteProps } from "react-router-dom";

import Home from "lib/pages/home";
import { Register } from "lib/layout/Register";
import Login from "lib/layout/Login";
import { Conversation } from "lib/layout/Conversation";
import Post from "lib/pages/posts/Post";
import Upload from "lib/pages/upload/Upload";
import { currentUserData, currentUserId } from "../../utils/currentUser";
import { UserContext } from "lib/context/UserContext";
import { useContext } from "react";
import ProtectedRoutes from "../components/ProtectedRoutes";
import PostId from "lib/pages/PostId";
const isLoggedIn = currentUserData.firstName != undefined;
console.log(isLoggedIn);
export const routes: Array<PathRouteProps> = [
  {
    path: "/messages",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/conversation/:id",
    element: <Conversation />,
  },
  {
    path: "/post/:id",
    element: <PostId />,
  },
  {
    path: "/",
    element: <Post />,
  },
  {
    path: "/upload",
    element: (
      <ProtectedRoutes isLoggedIn={isLoggedIn}>
        <Upload />
      </ProtectedRoutes>
    ),
  },
];

export const privateRoutes: Array<PathRouteProps> = [];
