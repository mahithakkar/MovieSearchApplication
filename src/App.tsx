import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./HomePage";
import DisplayPage from "./DisplayPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/search", element: <DisplayPage /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
