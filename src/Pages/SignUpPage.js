import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import Icons
import { BackwardIcon } from "@heroicons/react/24/solid";

export const SignUpPage = ({ motion }) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (ev) => {
    let name = ev.target.name;
    let value = ev.target.value;

    setUser((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleClick = () => {
    if (user.username !== "" && user.password !== "") {
      signUpNewUser();
    } else {
      alert("Please key in details");
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const signUpNewUser = async () => {
    let checkUser = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/users/jwtSignUp`,
      { fullName: user.username, password: user.password }
    );

    console.log("returned user token: ", checkUser);

    if (checkUser.data.success === true) {
      console.log("Bearer " + checkUser.data.data);
      localStorage.setItem("token", "Bearer " + checkUser.data.data);

      alert("New User Created!");
      navigate("/profilepictureupload");
    } else {
      alert("Sign Up unsuccessful. " + checkUser.data.msg);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-center h-[100dvh] pt-[2em] pb-[4em] px-[2em]">
        <motion.div
          className="flex flex-col w-full lg:w-[30%] justify-between text-center"
          initial={{ y: "20", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.1,
            type: "spring",
            mass: 0.4,
            damping: 8,
          }}
        >
          <div>
            <div className="absolute">
              <BackwardIcon
                className="h-6 w-6 text-blue-600 scale-100 transition-all hover:scale-[120%] active:scale-95"
                onClick={() => {
                  navigate("/");
                }}
              />
            </div>

            <h1 className="font-bold text-txtcolor-primary text-[2rem] pt-[20%] pb-[2em]">
              LET'S GET YOU STARTED.
            </h1>

            <div className="flex flex-col lg:gap-0 gap-[1em]">
              <input
                type="text"
                name="username"
                onChange={handleChange}
                value={user.username}
                autoComplete="off"
                placeholder="USERNAME"
                className="primary-input-form text-center"
              />

              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={user.password}
                autoComplete="off"
                placeholder="PASSWORD"
                className="primary-input-form text-center"
              />
            </div>
          </div>

          <motion.div
            initial={{ y: "20", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <form onSubmit={handleSubmit}>
              <input
                type="button"
                value="NEXT"
                onClick={handleClick}
                className="secondary-cta-btn w-[100%] lg:w-[100%]"
              />
            </form>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};
