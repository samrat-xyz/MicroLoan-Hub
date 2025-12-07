import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import About from "../pages/About/About";
import Loans from "../pages/Loans/Loans";
import Contact from "../pages/Contact/Contact";
import LoanDetails from "../pages/LoanDetails/LoanDetails";
import PrivateRoutes from "./PrivateRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path:'/about',
        Component:About
      },
      {
        path:'/all-loans',
        Component:Loans
      },
      {
        path:'/contact-us',
        Component:Contact
      },
      {
        path:'/loan-detail/:id',
        element:<PrivateRoutes><LoanDetails></LoanDetails></PrivateRoutes>
      }
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
]);
