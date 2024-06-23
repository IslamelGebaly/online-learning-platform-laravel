import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/contextProvider";
import axios from "axios";
const InstructorLayout = ({ children }) => {
    const { user, token, setToken, setUser } = useStateContext();

    const onLogout = () => {
        axios
            .post(
                "http://localhost:8000/api/logout",
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                console.log(response);
                setToken(null);
                setUser({});
            })
            .catch((error) => {
                console.log(`Bearer ${token}`);
                console.log(error);
            });
    };

    if (!token) return <Navigate to="/login" />;
    if (user.role === "student") return <Navigate to="/student" />;

    return (
        <div>
            <div
                id="defaultLayout"
                className="bg-blue-600 text-white full-width display flex flex-row p-2"
            >
                <aside className="w-11/12 flex flex-row">
                    <div className="mr-2 hover:underline hover:text-gray-300">
                        <Link to="/instructor/dashboard">Dashboard</Link>
                    </div>
                    <div className="mr-2 hover:underline hover:text-gray-300">
                        <Link to="/instructor/courses">Courses</Link>
                    </div>
                </aside>
                <div className="w-1/12 mr-2 hover:underline hover:text-gray-300">
                    <button onClick={onLogout}>Logout</button>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default InstructorLayout;
