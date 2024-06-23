import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../context/contextProvider";

const InstructorDashboard = () => {
    const { token } = useStateContext();
    const initialState = {
        numCourses: null,
    };
    const [data, setData] = useState(initialState);

    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:8000/api/instructor/dashboard`,
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
        return <h1>Loading Dashboard...</h1>;
    }

    return (
        <div className="bg-blue-600 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-white">
                <h3 className="font-semibold text-white text-2xl">
                    Number of Courses
                </h3>
                <p className="text-white text-lg font-semibold mt-4">
                    {data.numCourses}
                </p>
            </div>
        </div>
    );
};

export default InstructorDashboard;
