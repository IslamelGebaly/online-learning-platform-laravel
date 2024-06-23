import React, { useEffect } from "react";
import useInputState from "../../hooks/useInputState";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../context/contextProvider";

const EditLesson = (initialLesson) => {
    const { id } = useParams();

    const initialState = {
        title: "",
        description: "",
    };

    const { token } = useStateContext();
    const [lesson, updateLesson] = useInputState(initialState);
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/lesson/update/${id}`, lesson, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });

        return navigate("/instructor/lessons");
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
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        value={lesson["description"]}
                        onChange={updateLesson}
                        className="w-2/3 text-black"
                    />
                </div>
                <div className="p-2">
                    <button
                        type="submit"
                        className="bg-emerald-500 hover:bg-emerald-300 mt-2 p-2"
                    >
                        Edit Lesson
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditLesson;
