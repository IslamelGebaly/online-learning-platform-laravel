import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context/contextProvider";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Lesson = () => {
    const { id } = useParams();
    const { token } = useStateContext();
    const [lesson, setLesson] = useState({
        id: null,
        title: "",
        image_path: "",
        video_path: "",
        course: {},
        supporting_material: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/lesson/${id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setLesson(response.data.lesson);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <h1>Loading Lesson....</h1>;
    }

    return (
        <div className="bg-blue-600 text-white mt-2">
            <img src={lesson.image_path} className="w-full h-36" alt="" />
            <div className="grid grid-cols-2 gap-4">
                <div className="border-white border-2 p-2">
                    <label htmlFor="id" className="border-b-2">
                        ID
                    </label>
                    <h1>{lesson.id}</h1>
                </div>

                <div className="border-white border-2 p-2">
                    <label htmlFor="title" className="border-b-2">
                        Title
                    </label>
                    <h1>{lesson.title}</h1>
                </div>

                <div className="border-white border-2 p-2">
                    <label htmlFor="video" className="border-b-2">
                        Video
                    </label>
                    <h1>{lesson.video_path}</h1>
                </div>

                <div className="border-white border-2 p-2">
                    <label htmlFor="supporting_material" className="border-b-2">
                        Supporting Material
                    </label>
                    <h1>{lesson.supporting_material}</h1>
                </div>

                <div className="border-white border-2 p-2">
                    <div>
                        <label htmlFor="course" className="border-b-2">
                            Course
                        </label>
                        <h1>{lesson.course.title}</h1>
                    </div>
                </div>

                <div className="border-white border-2 p-2">
                    <div>
                        <label htmlFor="instructor" className="border-b-2">
                            Course
                        </label>
                        <h1>{lesson.course.title}</h1>
                    </div>
                </div>

                <div>
                    <button
                        onClick={() => navigate("/instructor/lesson/create")}
                        className="bg-emerald-500 hover:bg-emerald-300 p-2 mb-2 ml-2"
                    >
                        Edit Lesson
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Lesson;
