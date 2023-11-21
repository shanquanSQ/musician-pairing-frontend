import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import Icons
import { BackwardIcon } from "@heroicons/react/24/solid";

export const LoginPage = ({ motion }) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  // Check JWT Authentication on load
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     const checkAuthToken = async () => {
  //       try {
  //         const tokenAuth = "Bearer " + localStorage.getItem("token");

  //         const data = await axios.get("/", {
  //           headers: { Authorization: tokenAuth },
  //         });

  //         if (data.data.success) {
  //           setIsAuthenticated(true);
  //           navigate("/search");
  //         }
  //       } catch (err) {
  //         localStorage.removeItem("token");
  //       }
  //     };
  //     checkAuthToken();
  //   }
  // }, []);

  const handleChange = (ev) => {
    let name = ev.target.name;
    let value = ev.target.value;

    setUser((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSignIn = () => {
    console.log("sign in activate, checking for user: ", user);

    if (!user.username || !user.password) {
      alert("Please fill in both Username and Password!");
    }
    // Database Call to verify user
    else {
      console.log("entering");
      checkVerifiedUserSignIn();
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log("hello");
  };

  const checkVerifiedUserSignIn = async () => {
    let checkUser = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/users/jwtLogIn`,
      { fullName: user.username, password: user.password }
    );
    console.log("checkuser in database: ", checkUser.data);

    if (checkUser.data.success === true) {
      setIsAuthenticated(true);
      console.log("Bearer " + checkUser.data.data);
      localStorage.setItem("token", "Bearer " + checkUser.data.data);
      navigate("/search");
    } else {
      alert("Sign in unsuccessful. " + checkUser.data.msg);
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
            //some bug here with staggerChildren. will take a look
            staggerChildren: 2,
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

            <h1 className="font-bold text-txtcolor-primary text-[2rem] pt-[20%] pb-[2em] text-left">
              Log In
            </h1>

            <div className="flex flex-col lg:gap-0 gap-[1em]">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  value={user.username}
                  autoComplete="off"
                  placeholder="USERNAME"
                  className="primary-input-form mb-[.5em] lg:mb-[0em]"
                />

                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={user.password}
                  autoComplete="off"
                  placeholder="PASSWORD"
                  className="primary-input-form"
                />

                <button
                  type="submit"
                  onClick={handleSignIn}
                  className="opacity-0"
                />
              </form>
            </div>
          </div>

          <motion.div
            initial={{ y: "20", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <form onSubmit={handleSubmit}>
              <input
                type="button"
                value="SIGN IN"
                onClick={handleSignIn}
                className="secondary-cta-btn w-[100%] lg:w-[100%]"
              />
            </form>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};
