import type { PathRouteProps } from "react-router-dom";

import Home from "lib/pages/home";
import { Register } from "lib/layout/Register";
import Login from "lib/layout/Login";
import {Conversation} from "lib/layout/Conversation";


export const routes: Array<PathRouteProps> = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path:"/login",
    element:<Login />
  },
  {
    path: "/register", 
    element:<Register />
  },
  {
    path:"/conversation/:id",
    element:<Conversation />
  }
];

export const privateRoutes: Array<PathRouteProps> = [];
