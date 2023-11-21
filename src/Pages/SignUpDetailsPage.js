import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import Icons
import { BackwardIcon } from "@heroicons/react/24/solid";

export const SignUpDetailsPage = ({ motion }) => {
  const [userDetails, setUserDetails] = useState({
    genres: "",
    instruments: "",
    displayname: "",
    artists: "",
  });
  const navigate = useNavigate();

  const handleChange = (ev) => {
    let name = ev.target.name;
    let value = ev.target.value;

    setUserDetails((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  /** Probably can split this into two pages, so you only need a display name, while the other information is optional */

  const handleClick = () => {
    console.log(userDetails);
    navigate("/search");
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  return (
    <>
      <div className="flex flex-row justify-center h-[100dvh] pt-[2em] pb-[4em] px-[2em]">
        <motion.div
          className="flex flex-col w-full lg:w-[30%] justify-between text-center"
          initial={{ x: "20", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            delay: 0.1,
            type: "spring",
            mass: 0.4,
            damping: 8,
          }}
        >
          <div className="text-center">
            <div className="absolute">
              <BackwardIcon
                className="h-6 w-6 text-blue-600 scale-100 transition-all hover:scale-[120%] active:scale-95"
                onClick={() => {
                  navigate(-1);
                }}
              />
            </div>
            <h1 className="font-bold text-txtcolor-primary text-[2rem] pt-[20%] pb-[.5em]">
              LET THE COMMUNITY KNOW YOU!
            </h1>
            <p className=" text-slate-500 pb-[3em]">
              {`( ...Or fill in your bio later! )`}
            </p>

            <div className="flex flex-col lg:gap-0 gap-[1em]">
              <input
                type="text"
                name="displayname"
                onChange={handleChange}
                value={userDetails.displayname}
                autoComplete="off"
                placeholder="DISPLAY NAME"
                className="primary-input-form text-center"
              />

              <input
                type="text"
                name="instruments"
                onChange={handleChange}
                value={userDetails.instruments}
                autoComplete="off"
                placeholder="INSTRUMENTS"
                className="primary-input-form text-center mt-[.5em]"
              />

              <input
                type="text"
                name="genres"
                onChange={handleChange}
                value={userDetails.genres}
                autoComplete="off"
                placeholder="FAV GENRES"
                className="primary-input-form text-center"
              />

              <input
                type="text"
                name="artists"
                onChange={handleChange}
                value={userDetails.artists}
                autoComplete="off"
                placeholder="FAV ARTISTS"
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
