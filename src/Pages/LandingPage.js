import React from "react";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("login");
  };

  return (
    <>
      <div className="flex flex-row justify-center h-[100dvh] pt-[2em] pb-[4em] px-[2em] relative">
        <div className="flex flex-col w-full justify-between text-center overflow-hidden ">
          <h1 className="font-bold text-[3rem] pt-[1.5em] lg:pt-[3em]">
            SESSIONS
          </h1>

          <div>
            <input
              type="button"
              value="SIGN IN"
              onClick={handleClick}
              className="primary-cta-btn w-[100%] lg:w-[50%] "
            />
          </div>
        </div>

        <div className="">
          <svg
            height="100%"
            width="100%"
            className="absolute bottom-0 lg:bottom-[0] left-[50%] translate-x-[-50%] z-[-1] fill-[#2B6CAA]"
          >
            <circle cx="50%" cy="110%" r="60%" />
          </svg>

          <svg
            height="100%"
            width="100%"
            className="absolute bottom-0 lg:bottom-[0] left-[50%] translate-x-[-50%] z-[-1] fill-[#FFB800]"
          >
            <circle cx="50%" cy="110%" r="50%" />
          </svg>

          <svg
            height="100%"
            width="100%"
            className="absolute bottom-0 lg:bottom-[0] left-[50%] translate-x-[-50%] z-[-1] fill-[#AB3257]"
          >
            <circle cx="50%" cy="110%" r="40%" />
          </svg>
        </div>
      </div>

      {/* FFB800 82D144 */}
    </>
  );
};
