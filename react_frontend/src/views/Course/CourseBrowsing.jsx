import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context/contextProvider";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import StudentDashboard from "../StudentDashboard";

const CourseBrowsing = () => {
    const { token, user } = useStateContext();
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:8000/api/enroll/browse`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log(response);
            setCourses(response.data.courses);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const enroll = async (id) => {
        axios
            .post(
                "http://localhost:8000/api/enroll/create",
                {
                    status: "in_progress",
                    course_id: id,
                    student_id: user.id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                console.log(response);
                navigate("/student/dashboard");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return <h1>Loading Courses....</h1>;
    }

    return (
        <div className="bg-blue-600 text-white mt-2">
            <table>
                <thead>
                    <tr className="border-white border-2">
                        <th className="px-2 py-2">ID</th>
                        <th className="px-2 py-2">Title</th>
                        <th className="px-2 py-2">Instructor</th>
                        <th className="px-2 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td className="px-2 py-2">{course.id}</td>
                            <td className="px-2 py-2">
                                <Link
                                    to={`/instructor/course/${course.id}`}
                                    className="hover:underline"
                                >
                                    {course.title}
                                </Link>
                            </td>
                            <td className="px-2 py-2">
                                {course.instructor.name}
                            </td>
                            <td className="px-2 py-2">
                                <button
                                    onClick={() => enroll(course.id)}
                                    className="bg-emerald-500 text-white hover:bg-emerald-300 mr-2 p-2"
                                >
                                    Enroll
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseBrowsing;
