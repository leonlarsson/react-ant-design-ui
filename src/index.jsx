import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Home from "./components/Home";
import UserSearch from "./components/UserSearch";
import User from "./components/User/User";
import UserDatabase from "./components/UserDatabase";
import UserStatistics from "./components/UserStatistics";
import ItemDatabase from "./components/ItemDatabase";
import Items2 from "./components/Items2";
import Tools1 from "./components/Tools1";
import Tools2 from "./components/Tools2";
import Tools3 from "./components/Tools3";
import Lorem from "./components/Lorem";
import Ipsum from "./components/Ipsum";
import NotFound from "./components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "user-search", element: <UserSearch /> },
      { path: "user/:id", element: <User /> },
      { path: "user-database", element: <UserDatabase /> },
      { path: "user-statistics", element: <UserStatistics /> },
      { path: "item-database", element: <ItemDatabase /> },
      { path: "items-2", element: <Items2 /> },
      { path: "tools-1", element: <Tools1 /> },
      { path: "tools-2", element: <Tools2 /> },
      { path: "tools-3", element: <Tools3 /> },
      { path: "lorem", element: <Lorem /> },
      { path: "ipsum", element: <Ipsum /> },
      { path: "*", element: <NotFound /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);