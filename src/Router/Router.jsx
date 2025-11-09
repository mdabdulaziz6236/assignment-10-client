import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Auth/Register";

export const router = createBrowserRouter([{
    path:'/',
    element:<MainLayout></MainLayout>,
    children:[
        {
            index:true,
            Component:Home,
        },{
            path:'/register',
            Component:Register
        }
    ]
}])