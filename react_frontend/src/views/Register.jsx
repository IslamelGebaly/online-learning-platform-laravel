import React from "react";
import useInputState from "../hooks/useInputState";
import { useStateContext } from "../context/contextProvider";
import axios from "axios";

const Register = () => {
    const initialState = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "student",
    };

    const [registerInputs, updateInputs, resetInputs] =
        useInputState(initialState);

    const { setToken, setUser } = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/register", registerInputs)
            .then(({ data }) => {
                setToken(data.token);
                setUser(data.user);

                if (!data.token) {
                    resetInputs();
                }
            })
            .catch((response) => {
                console.log(response);
                setToken(null);
            });
    };

    return (
        <form
            action=""
            className="bg-blue-500 text-white flex justify-center items-left flex-col p-4"
            onSubmit={onSubmit}
        >
            <div className="flex flex-col">
                <label htmlFor="user-email">Email</label>
                <input
                    className="text-black mt-1 pt-1 pl-1"
                    type="email"
                    id="user-email"
                    name="email"
                    placeholder="email"
                    onChange={updateInputs}
                />
            </div>
            <div className="flex flex-col mt-2">
                <label htmlFor="user-name">Name</label>
                <input
                    className="text-black mt-1 pt-1 pl-1"
                    type="name"
                    id="user-name"
                    name="name"
                    placeholder="name"
                    onChange={updateInputs}
                />
            </div>
            <div className="flex flex-col mt-2">
                <label htmlFor="user-password">Password</label>
                <input
                    className="text-black mt-1 pt-1 pl-1"
                    type="password"
                    id="user-password"
                    name="password"
                    placeholder="password"
                    onChange={updateInputs}
                />
            </div>
            <div className="flex flex-col mt-2">
                <label htmlFor="user-password-confirmation">
                    Confirm Password
                </label>
                <input
                    className="text-black mt-1 pt-1 pl-1"
                    type="password"
                    id="user-password-confirmation"
                    name="password_confirmation"
                    placeholder="password confirmation"
                    onChange={updateInputs}
                />
            </div>
            <div className="flex flex-col">
                <fieldset id="role" className="flex flex-row p-1 mt-1">
                    <label htmlFor="student" className="mr-0.5">
                        Student
                    </label>
                    <input
                        type="radio"
                        value="student"
                        id="student"
                        checked={registerInputs["role"] === "student"}
                        onChange={updateInputs}
                        name="role"
                        className="mr-0.5"
                    />
                    <label htmlFor="instructor" className="mr-0.5">
                        Instructor
                    </label>
                    <input
                        type="radio"
                        value="instructor"
                        id="instructor"
                        checked={registerInputs["role"] === "instructor"}
                        onChange={updateInputs}
                        name="role"
                        className="mr-0.5"
                    />
                </fieldset>
            </div>
            <button
                type="submit"
                className="border-white hover:bg-white hover:text-blue-500 border-2 p-1 mt-4"
            >
                Register
            </button>
        </form>
    );
};

export default Register;
