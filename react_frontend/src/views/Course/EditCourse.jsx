import React, { useEffect } from "react";
import useInputState from "../../hooks/useInputState";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../context/contextProvider";

const EditCourse = (initialCourse) => {
    const { id } = useParams();

    const initialState = {
        title: "",
        description: "",
    };

    const { token } = useStateContext();
    const [course, updateCourse] = useInputState(initialState);
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/course/update/${id}`, course, {
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
                        Edit Course
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditCourse;
