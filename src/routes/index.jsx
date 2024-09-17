import { useRoutes } from "react-router-dom";
import { lazy } from "react";
import Suspense from "../utils";
import Navbar from "./nav/Navbar"; 

const Home = lazy(() => import('../routes/home/Home'));
const Profile = lazy(() => import('../routes/profile/Profile'));
const Auth = lazy(() => import('../routes/auth/Auth'));
const Login = lazy(() => import('../routes/auth/login/Login'));
const SignUp = lazy(() => import('../routes/auth/signup/SignUp'));
const NotFound = lazy(() => import('../routes/not-found/NotFound'));
const Private = lazy(() => import('../routes/private/Private'));
const ProductDetails = lazy(() => import('../routes/Single/ProductDetails'));

const RouteController = () => {
  return useRoutes([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Suspense><Home /></Suspense>
        </>
      ),
    },
    {
      path: "/profile",
      element: (
        <>
          <Navbar /> 
          <Suspense><Private /></Suspense>
        </>
      ),
      children: [
        {
          path: "/profile/",
          element: <Suspense><Profile /></Suspense>,
        },
      ],
    },
    
    {
      path: "/auth",
      element: (
        <>
          <Navbar />
          <Suspense><Auth /></Suspense>
        </>
      ),
      children: [
        {
          path: "/auth/login",
          element: <Suspense><Login /></Suspense>,
        },
        {
          path: "/auth/signup",
          element: <Suspense><SignUp /></Suspense>,
        },
      ],
    },
    {
      path: "/product/:id", 
      element: (
        <>
          <Navbar />
          <Suspense><ProductDetails /></Suspense>
        </>
      ),
    },
    {
      path: "*",
      element: <Suspense><NotFound /></Suspense>, 
    },
  ]);
};

export default RouteController;
