import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../context/contextProvider";
import { Link } from "react-router-dom";
const StudentDashboard = () => {
    const { token } = useStateContext();
    const initialState = {
        courses: [],
        numEnrollments: null,
        numInProgress: null,
        numCompleted: null,
    };
    const [data, setData] = useState(initialState);

    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:8000/api/student/dashboard`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return <h1>Loading Courses....</h1>;
    }

    return (
        <div>
            <div>
                <div className="bg-blue-600 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-white">
                        <h3 className="font-semibold text-white text-2xl">
                            Enrollments
                        </h3>
                        <p className="text-white text-lg font-semibold mt-4">
                            {data.numEnrollments}
                        </p>
                    </div>
                </div>
                <div className="bg-blue-600 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-white">
                        <h3 className="font-semibold text-white text-2xl">
                            In Progress
                        </h3>
                        <p className="text-white text-lg font-semibold mt-4">
                            {data.numInProgress}
                        </p>
                    </div>
                </div>
                <div className="bg-blue-600 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-white">
                        <h3 className="font-semibold text-white text-2xl">
                            Completed
                        </h3>
                        <p className="text-white text-lg font-semibold mt-4">
                            {data.numCompleted}
                        </p>
                    </div>
                </div>
            </div>
            <table>
                <thead>
                    <tr className="border-white border-2">
                        <th className="px-2 py-2">ID</th>
                        <th className="px-2 py-2">Title</th>
                        <th className="px-2 py-2">Instructor</th>
                    </tr>
                </thead>
                <tbody>
                    {data.courses.map((course) => (
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentDashboard;
