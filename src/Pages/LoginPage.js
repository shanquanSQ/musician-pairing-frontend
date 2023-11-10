import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import Icons
import { BackwardIcon } from "@heroicons/react/24/solid";

export const LoginPage = () => {
  const [user, setUser] = useState({ user: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (ev) => {
    let name = ev.target.name;
    let value = ev.target.value;

    setUser((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleClick = () => {
    console.log(user);
    navigate("/search");
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  return (
    <>
      <div className="flex flex-row justify-center h-[100dvh] pt-[2em] pb-[4em] px-[2em]">
        <div className="flex flex-col w-full lg:w-[30%] justify-between text-center ">
          <div>
            <div className="absolute">
              <BackwardIcon
                className="h-6 w-6"
                onClick={() => {
                  navigate("/");
                }}
              />
            </div>

            <h1 className="font-bold text-txtcolor-primary text-[2rem] pt-[20%] pb-[2em] text-left">
              Log In
            </h1>

            <div className="flex flex-col gap-5">
              <input
                type="text"
                name="username"
                onChange={handleChange}
                value={user.username}
                autoComplete="off"
                placeholder="USERNAME"
                className="primary-input-form"
              />

              <input
                type="text"
                name="password"
                onChange={handleChange}
                value={user.password}
                autoComplete="off"
                placeholder="PASSWORD"
                className="primary-input-form"
              />
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="button"
                value="SIGN IN"
                onClick={handleClick}
                className="secondary-cta-btn w-[100%] lg:w-[100%]"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
