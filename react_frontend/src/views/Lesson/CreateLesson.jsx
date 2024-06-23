import React from "react";
import useInputState from "../../hooks/useInputState";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/contextProvider";
const CreateLesson = () => {
    const initialState = {
        title: "",
        image_path: null,
        video_path: "",
        supporting_material: "",
        course: "",
    };

    const { token } = useStateContext();
    const [lesson, updateLesson, resetLesson] = useInputState(initialState);
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/lesson/create", lesson, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response);
                return navigate(`/instructor/course/${lesson.course}`);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="mt-4 bg-blue-600 text-white">
            <form action="" onSubmit={onSubmit}>
                <div className="flex flex-col text-lg mt-2 p-2">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="title"
                        value={lesson["title"]}
                        onChange={updateLesson}
                        className="w-2/3 text-black"
                    />
                </div>
                <div className="flex flex-col text-lg mt-2 p-2">
                    <label htmlFor="image_path">Image Path</label>
                    <input
                        type="text"
                        name="image_path"
                        id="image_path"
                        value={lesson["image_path"]}
                        onChange={updateLesson}
                        className="w-2/3 text-black"
                    />
                </div>
                <div className="flex flex-col text-lg mt-2 p-2">
                    <label htmlFor="video_path">Video Path</label>
                    <input
                        type="text"
                        name="video_path"
                        id="video_path"
                        value={lesson["video_path"]}
                        onChange={updateLesson}
                        className="w-2/3 text-black"
                    />
                </div>
                <div className="flex flex-col text-lg mt-2 p-2">
                    <label htmlFor="supporting_material">
                        Supporting Material
                    </label>
                    <input
                        type="text"
                        name="supporting_material"
                        id="supporting_material"
                        value={lesson["supporting_material"]}
                        onChange={updateLesson}
                        className="w-2/3 text-black"
                    />
                </div>
                <div className="flex flex-col text-lg mt-2 p-2">
                    <label htmlFor="course">Course</label>
                    <input
                        type="text"
                        name="course"
                        id="course"
                        value={lesson["course"]}
                        onChange={updateLesson}
                        className="w-2/3 text-black"
                    />
                </div>
                <div className="p-2">
                    <button
                        type="submit"
                        className="bg-emerald-500 hover:bg-emerald-300 mt-2 p-2"
                    >
                        Create Lesson
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateLesson;
