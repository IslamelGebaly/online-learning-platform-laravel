import React from "react";
import useInputState from "../hooks/useInputState";
import axios from "axios";
import { useStateContext } from "../context/contextProvider";

const Login = () => {
    const initialState = {
        email: "",
        password: "",
        role: "student",
    };

    const { setToken, setUser } = useStateContext();

    const [loginInputs, updateInputs, resetInputs] =
        useInputState(initialState);

    let error = false;

    const onSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:8000/api/login", loginInputs)
            .then(({ data }) => {
                setToken(data.token);
                console.log(data.user);
                setUser(data.user);
                if (!data.token) {
                    resetInputs("password");
                    error = true;
                }
            })
            .catch((response) => {
                console.log(response);
                setToken(null);
            });
    };

    return (
        <form
            className="bg-blue-500 text-white flex justify-center items-start flex-col p-4"
            onSubmit={onSubmit}
        >
            <div className="flex flex-col">
                {error && <h1>Wrong email or password</h1>}
                <label htmlFor="user-email">Email</label>
                <input
                    className="text-black mt-1 pt-1 pl-1"
                    type="email"
                    id="user-email"
                    name="email"
                    placeholder="email"
                    value={loginInputs["email"]}
                    onChange={updateInputs}
                />
            </div>
            <div className="flex flex-col mt-2 ">
                <label htmlFor="user-password">Password</label>
                <input
                    className="text-black mt-1 pt-1 pl-1"
                    type="password"
                    id="user-password"
                    name="password"
                    placeholder="password"
                    value={loginInputs["password"]}
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
                        checked={loginInputs["role"] === "student"}
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
                        checked={loginInputs["role"] === "instructor"}
                        onChange={updateInputs}
                        name="role"
                        className="mr-0.5"
                    />
                </fieldset>
            </div>
            <button
                type="submit"
                className="border-white hover:bg-white hover:text-blue-500 border-2 p-1 mt-4 "
            >
                Login
            </button>
        </form>
    );
};

export default Login;
