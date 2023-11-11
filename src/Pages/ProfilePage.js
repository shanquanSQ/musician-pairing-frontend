import React from "react";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-row justify-center h-[100dvh] pt-[2em] pb-[4em] px-[2em] border-2 border-blue-300">
        <div className="flex flex-col w-full lg:w-[30%] justify-between ">
          <div className="flex flex-col pt-[2em] mb-[-10em]">
            <h1 className="font-bold text-txtcolor-primary text-[1.5rem] text-left ">
              PROFILE
            </h1>
          </div>
          {/* 
          <div className="flex flex-col">
            <h1 className="font-bold text-txtcolor-primary text-[1.5rem] text-left">
              Stuffz
            </h1>
          </div> */}

          <div>
            <form>
              <input
                type="button"
                value="LOGOUT"
                onClick={() => {
                  navigate("/");
                }}
                className="secondary-cta-btn w-[100%] lg:w-[100%]"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
