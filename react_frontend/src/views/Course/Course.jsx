import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context/contextProvider";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const Course = () => {
    const { id } = useParams();
    const { token } = useStateContext();
    const [course, setCourse] = useState({
        id: null,
        title: "",
        description: "",
        instructor: {},
    });
    const [lessons, setLessons] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/course/${id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                console.log(response.data);
                setCourse(response.data.course);
                setLessons(response.data.lessons);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const deleteCourse = (id) => {
        axios
            .delete(`http://localhost:8000/api/course/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                navigate("/instructor/courses");
            })
            .catch((error) => console.log(error));
    };

    const deleteLesson = (id) => {
        axios
            .delete(`http://localhost:8000/api/lesson/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setLessons(lessons.filter((lesson) => lesson.id !== id));
            })
            .catch((error) => console.log(error));
    };

    if (isLoading) {
        return <h1>Loading Course....</h1>;
    }

    return (
        <div className="bg-blue-600 text-white mt-2">
            <div className="grid grid-cols-2 gap-4">
                <div className="border-white border-2 p-2">
                    <label htmlFor="id" className="border-b-2">
                        ID
                    </label>
                    <h1>{course.id}</h1>
                </div>

                <div className="border-white border-2 p-2">
                    <label htmlFor="title" className="border-b-2">
                        Title
                    </label>
                    <h1>{course.title}</h1>
                </div>

                <div className="border-white border-2 p-2">
                    <label htmlFor="description" className="border-b-2">
                        Description
                    </label>
                    <h1>{course.description}</h1>
                </div>

                <div className="border-white border-2 p-2">
                    <div>
                        <label htmlFor="instructor" className="border-b-2">
                            Instructor
                        </label>
                        <h1>{course.instructor.name}</h1>
                    </div>
                </div>

                <div>
                    <button
                        onClick={() => navigate("/instructor/lesson/create")}
                        className="bg-emerald-500 hover:bg-emerald-300 p-2 mb-2 ml-2"
                    >
                        Create Lesson
                    </button>
                </div>
            </div>
            <table>
                <thead>
                    <tr className="border-white border-2">
                        <th className="px-2 py-2">ID</th>
                        <th className="px-2 py-2">Title</th>
                        <th className="px-2 py-2">Course</th>
                        <th className="px-2 py-2">Image</th>
                        <th className="px-2 py-2">Video</th>
                        <th className="px-2 py-2">Supporting Material</th>
                        <th className="px-2 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {lessons.map((lesson) => (
                        <tr key={lesson.id}>
                            <td className="px-2 py-2">{lesson.id}</td>
                            <td className="px-2 py-2">
                                <div className="hover:underline">
                                    <Link
                                        to={`/instructor/lesson/${lesson.id}`}
                                    >
                                        {lesson.title}
                                    </Link>
                                </div>
                            </td>
                            <td className="px-2 py-2">{lesson.course.title}</td>
                            <td className="px-2 py-2">
                                <img
                                    src={lesson.image_path}
                                    className="w-20"
                                    alt=""
                                />
                            </td>
                            <td className="px-2 py-2">{lesson.video_path}</td>
                            <td className="px-2 py-2">
                                lesson.supporting_material
                            </td>
                            <td className="px-2 py-2">
                                <button
                                    onClick={() =>
                                        navigate(
                                            `/instructor/edit-lesson/${lesson.id}`
                                        )
                                    }
                                    className="bg-emerald-500 text-white hover:bg-emerald-300 mr-2 p-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteLesson(lesson.id)}
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

export default Course;
