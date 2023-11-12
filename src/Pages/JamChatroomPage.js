import React from "react";
import { JamRoomBubble } from "../Components/JamRoomBubble/JamRoomBubble";

// Import Components

export const JamChatroomPage = ({ motion }) => {
  // Each item will be multiple columns of the rooms table, so it will be a list of objects instead.
  // Will need to check JamRoomBubble component to see what data we want to display on the page
  const roomData = [
    "HEAVY METAL FANS ONLY !!@@!",
    "swifties forever",
    "lo-fi chill jams",
  ];

  return (
    <>
      <div className="flex flex-row justify-center h-[100dvh] pt-[2em] pb-[4em] px-[2em] ">
        <div className="flex flex-col w-full lg:w-[30%] justify-between overflow-x-hidden overflow-y-auto">
          <div className="flex flex-col pt-[2em] mb-[-10em]">
            <h1 className="font-bold text-txtcolor-primary text-[1.5rem] pb-[2em] text-left">
              JAM ROOMS
            </h1>
            <div className="pr-[2em]">
              {roomData.map((element, index) => {
                return (
                  <div key={index} id={element} className="inline pr-[.5em]">
                    <JamRoomBubble roomdata={element} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
