import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/contextProvider";

const GuestLayout = ({ children }) => {
    const { user, token } = useStateContext();

    if (token) {
        if (user.role === "student") return <Navigate to="/student" />;
        else if (user.role === "instructor")
            return <Navigate to="/instructor" />;
    }

    return (
        <div>
            <div
                id="defaultLayout"
                className="bg-blue-600 text-white full-width display flex flex-row p-2"
            >
                <aside className="w-11/12 flex flex-row">
                    <div className="mr-2 hover:underline hover:text-gray-300">
                        <Link to="/login">Login</Link>
                    </div>
                    <div className="mr-2 hover:underline hover:text-gray-300">
                        <Link to="/register">Register</Link>
                    </div>
                </aside>
            </div>
            <Outlet />
        </div>
    );
};

export default GuestLayout;
