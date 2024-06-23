import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context/contextProvider";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CourseManagement = () => {
    const { token } = useStateContext();
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:8000/api/course/instructor`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            console.log(response.data);
            setCourses(response.data.courses);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteCourse = (id) => {
        axios
            .delete(`http://localhost:8000/api/course/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setCourses(courses.filter((course) => course.id !== id));
            })
            .catch((error) => console.log(error));
    };

    if (isLoading) {
        return <h1>Loading Courses....</h1>;
    }

    return (
        <div className="bg-blue-600 text-white mt-2">
            <div>
                <button
                    onClick={() => navigate("/instructor/create-course")}
                    className="p-2 text-white bg-emerald-500 hover:bg-emerald-300"
                >
                    Create Course
                </button>
            </div>
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
                                    onClick={() =>
                                        navigate(
                                            `/instructor/edit-course/${course.id}`
                                        )
                                    }
                                    className="bg-emerald-500 text-white hover:bg-emerald-300 mr-2 p-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteCourse(course.id)}
                                    className="bg-red-500 text-white hover:bg-red-300 mr-2 p-2"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseManagement;
