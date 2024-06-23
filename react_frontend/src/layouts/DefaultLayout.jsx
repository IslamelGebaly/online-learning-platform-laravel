import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/contextProvider";
const DefaultLayout = ({ children }) => {
    const { user, token } = useStateContext();

    if (!token) return <Navigate to="/login" />;

    console.log(user);
    if (user.role === "student") return <Navigate to="/student" />;
    else if (user.role === "instructor") return <Navigate to="/instructor" />;

    return <Outlet />;
};

export default DefaultLayout;
