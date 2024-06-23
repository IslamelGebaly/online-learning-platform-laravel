import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import NotFound from "./views/NotFound";
import GuestLayout from "./layouts/GuestLayout";
import StudentDashboard from "./views/StudentDashboard";
import InstructorDashboard from "./views/InstructorDashboard";
import InstructorLayout from "./layouts/InstructorLayout";
import StudentLayout from "./layouts/StudentLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import CourseManagement from "./views/Course/CourseManagement";
import Course from "./views/Course/Course";
import CreateCourse from "./views/Course/CreateCourse";
import EditCourse from "./views/Course/EditCourse";
import Lesson from "./views/Lesson/Lesson";
import CreateLesson from "./views/Lesson/CreateLesson";
import CourseBrowsing from "./views/Course/CourseBrowsing";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
    },
    {
        path: "/student",
        element: <StudentLayout />,
        children: [
            {
                path: "/student",
                element: <Navigate to="/student/dashboard" />,
            },
            {
                path: "dashboard",
                element: <StudentDashboard />,
            },
            {
                path: "browse",
                element: <CourseBrowsing />,
            },
        ],
    },
    {
        path: "/instructor",
        element: <InstructorLayout />,
        children: [
            {
                path: "/instructor",
                element: <Navigate to="/instructor/dashboard" />,
            },
            {
                path: "dashboard",
                element: <InstructorDashboard />,
            },
            {
                path: "courses",
                element: <CourseManagement />,
            },
            {
                path: "course/:id",
                element: <Course />,
            },
            {
                path: "create-course",
                element: <CreateCourse />,
            },
            {
                path: "edit-course/:id",
                element: <EditCourse />,
            },
            {
                path: "lesson/:id",
                element: <Lesson />,
            },
            {
                path: "lesson/create",
                element: <CreateLesson />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
