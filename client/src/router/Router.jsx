import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from "../pages/home/Home";
import AddBook from "../pages/addBook/AddBook";
import UpdateBook from "../components/updateBook/UpdateBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "add",
    element: <AddBook />,
  },
  {
    path: "update",
    element: <UpdateBook />,
  },
]);

export { router };
