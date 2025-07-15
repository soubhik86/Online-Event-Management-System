import React from "react";
import Home from "./components/pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/layout/Root";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import HeroBackground from "./components/pages/HeroBackground";
import VerifyEmail from "./components/pages/VerifyEmail";
import EventList from "./components/pages/Events/EventList";
import Schedule from "./components/pages/Events/Schedule";
import EventById from "./components/pages/Events/EventById";
import BookTicket from "./components/pages/Events/BookTicket";
import MyTickets from "./components/pages/Events/MyTicket";
import Contact from "./components/pages/Contact";
import About from "./components/pages/About";
import Management from "./components/pages/Management";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import LatestNews from "./components/pages/Events/LatestNews";
import Newsletter from "./components/pages/Events/Newsletter";
import "./App.css"; // ✅ fixed import
import Blog from "./components/pages/Blog";
import UpdateProfile from "./components/pages/UpdateProfile";
import ForgetPassword from "./components/pages/Events/ForgetPassword";
import ResetPassword from "./components/pages/ResetPassword";




const router = createBrowserRouter([
  { 
    path: "/",
    element: <Root />,
    children:[
      {
        path: "/",
        element: <HeroBackground />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/verify-email",
        element: <VerifyEmail />
      },
      {
        path: "/eventlist",
        element: <EventList />
      },
      {
        path: "//eventbyid/:id",
        element: <EventById />
      },
      {
        path: "/bookticket/:id",
        element: <BookTicket />
      },
      {
        path: "/schedule",
        element: <Schedule />
      },
      {
        path: "/myregistrations",
        element: <MyTickets/>
      },
      {
        path: "/contact",
        element: <Contact/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/management",
        element: <Management/>
      },
     
      {
        path: "/news",
        element: <LatestNews/>
      },
     
      {
        path: "/newsletter",
        element: <Newsletter/>
      },
      {
        path: "/blogs",
        element: <Blog/>
      },
     
      {
        path: "/profile",
        element: <UpdateProfile/>
      },
      {
        path: "/forgetpassword",
        element: <ForgetPassword/>
      },
      {
        path: "/resetpassword",
        element: <ResetPassword/>
      },
     

   
    ]
  }
])


function App() {
  return (
    <>
     <RouterProvider router={router} />
     <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
