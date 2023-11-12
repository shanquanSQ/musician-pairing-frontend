import React from "react";
import { useNavigate } from "react-router-dom";

export const ProfilePage = ({ motion }) => {
  const navigate = useNavigate();

  // Lists will probably come from server as a prop.
  // Not sure if server request will be done here or in parent component.
  const instrumentsList = [
    "Guitar",
    "Keyboard",
    "Bass",
    "Triangle",
    "castanets",
    "flute",
  ];

  const genreList = ["Rock", "Pop", "Hip Hop", "Electronic", "Jazz", "Country"];

  const numberOfSessions = "65";
  const uniqueCollaborators = "55";

  return (
    <>
      <div className="flex flex-row justify-center h-[100dvh] pt-[2em] pb-[4em] px-[2em] border-2 border-blue-300">
        <div className="flex flex-col w-full lg:w-[30%] justify-between ">
          <div className="flex flex-col pt-[2em] mb-[-10em]">
            <div>
              <h1 className="font-bold text-txtcolor-primary text-[1.5rem] text-left ">
                PROFILE
              </h1>

              <div className="image-wrapper">image goes here</div>
            </div>

            <div>
              <h1 className="font-bold text-txtcolor-primary text-[1.5rem] text-left ">
                INSTRUMENTS
              </h1>
              {instrumentsList.map((element, index) => {
                return (
                  <div key={index} id={element} className="inline pr-[.5em]">
                    {element.toUpperCase()} /
                  </div>
                );
              })}
            </div>

            <div>
              <h1 className="font-bold text-txtcolor-primary text-[1.5rem] text-left ">
                GENRES
              </h1>
              {genreList.map((element, index) => {
                return (
                  <div key={index} id={element} className="inline pr-[.5em]">
                    {element.toUpperCase()} /
                  </div>
                );
              })}
            </div>

            <div>
              <h1 className="font-bold text-txtcolor-primary text-[1.5rem] text-left ">
                SESSIONS
              </h1>
              <p>{numberOfSessions}</p>
            </div>

            <div>
              <h1 className="font-bold text-txtcolor-primary text-[1.5rem] text-left ">
                UNIQUE JAM BUDDIES
              </h1>
              <p>{uniqueCollaborators}</p>
            </div>

            <p></p>
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
