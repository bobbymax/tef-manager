/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable quotes */
/* eslint-disable arrow-body-style */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../../features/auth/userSlice";
import { login } from "../../services/controllers/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authenticateUser = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    setIsLoggingIn(true);

    try {
      login(data)
        .then((res) => {
          setIsLoggingIn(false);
          setTimeout(() => {
            dispatch(authenticate(res.data));
            setEmail("");
            setPassword("");
            navigate("/");
          }, 1000);
        })
        .catch((err) => {
          setIsLoggingIn(false);
          console.log(err.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={authenticateUser}>
      {isLoggingIn && <p>Loading....</p>}
      {/* Email input */}
      <div className="mb-6">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Email address"
        />
      </div>
      {/* Password input */}
      <div className="mb-6">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Password"
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
