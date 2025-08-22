//router lives here

//import functions from router dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./HomePage";
import DisplayPage from "./DisplayPage";

//made path and element so the page doesnt ahve to reload each time, sets path
const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/search", element: <DisplayPage /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

