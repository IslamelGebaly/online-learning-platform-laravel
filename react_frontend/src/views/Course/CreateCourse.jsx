import React from "react";
import useInputState from "../../hooks/useInputState";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/contextProvider";
const CreateCourse = () => {
    const initialState = {
        title: "",
        description: "",
    };

    const { token } = useStateContext();
    const [course, updateCourse, resetCourse] = useInputState(initialState);
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/course/create", course, {
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

        return navigate("/instructor/courses");
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
                        value={course["title"]}
                        onChange={updateCourse}
                        className="w-2/3 text-black"
                    />
                </div>
                <div className="flex flex-col text-lg mt-2 p-2">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        value={course["description"]}
                        onChange={updateCourse}
                        className="w-2/3 text-black"
                    />
                </div>
                <div className="p-2">
                    <button
                        type="submit"
                        className="bg-emerald-500 hover:bg-emerald-300 mt-2 p-2"
                    >
                        Create Course
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCourse;
