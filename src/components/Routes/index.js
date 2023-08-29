import { createBrowserRouter } from "react-router-dom";
import Layout from "../shared/Layout/Layout";
import Homepage from "../../pages/Homepage";
import SignIn from "../../pages/auth/SignIn";
import Registration from "../../pages/auth/Registration";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Homepage />,
            },
            {
                path: "/signin",
                element: < SignIn />,
            },
            {
                path: "/registration",
                element: <Registration />,
            },
        ],
    },
]);
export default router