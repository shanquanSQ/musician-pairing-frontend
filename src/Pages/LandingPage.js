import React from "react";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("login");
  };

  return (
    <>
      <div className="flex flex-row justify-center h-[100dvh] pt-[2em] pb-[4em] px-[2em]">
        <div className="flex flex-col w-full justify-between text-center ">
          <h1 className="font-bold text-[3rem] pt-[3em]">SESSIONS</h1>

          <div>
            <input
              type="button"
              value="SIGN IN"
              onClick={handleClick}
              className="primary-cta-btn w-[100%] lg:w-[50%]"
            />
          </div>
        </div>
      </div>
    </>
  );
};
