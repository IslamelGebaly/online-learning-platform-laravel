import React from "react";
import { useState } from "react";

const useInputState = (initialVal) => {
    const [state, setState] = useState(initialVal);

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const reset = (target) => {
        setState({ ...state, [target]: "" });
    };

    return [state, handleChange, reset];
};

export default useInputState;
