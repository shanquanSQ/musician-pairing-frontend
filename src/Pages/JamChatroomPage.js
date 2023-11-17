import React, { useState, useEffect } from "react";
import { JamRoomBubble } from "../Components/JamRoomBubble/JamRoomBubble";
import axios from "axios";

// Import Components

export const JamChatroomPage = ({ motion }) => {
  const [userRoomData, setUserRoomData] = useState(null);
  // Each item will be multiple columns of the rooms table, so it will be a list of objects instead.
  // Will need to check JamRoomBubble component to see what data we want to display on the page

  // This primary key should be tied to Auth
  const usersPrimaryKey = 1;

  useEffect(() => {
    getRoomData();
  }, []);

  const getRoomData = async () => {
    // Get chatroom information.
    // This should be tied to User's joined rooms.
    // Before auth, just hardcoding the usersPrimaryKey.
    console.log("getting room data");
    let userRoomInformation = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/users/${usersPrimaryKey}/joinedChatrooms`
    );

    if (userRoomInformation.data.success === true) {
      setUserRoomData(userRoomInformation.data.data);
    } else {
      alert("Unable to get user's joined room data.");
    }
  };

  return (
    <>
      <div className="flex flex-row justify-center h-[100dvh] pt-[2em] pb-[4em] px-[2em] ">
        <div className="flex flex-col w-full lg:w-[30%] justify-between overflow-x-hidden overflow-y-auto">
          <div className="flex flex-col pt-[2em] mb-[-10em]">
            <h1 className="font-bold text-txtcolor-primary text-[1.5rem] pb-[1em] text-left">
              JOINED JAM ROOMS
            </h1>

            <button
              onClick={() => {
                console.log(userRoomData);
              }}
              className="bg-red-500 px-2 py-1"
            >
              View room data state
            </button>
            <br />

            <div className="pr-[2em]">
              {userRoomData &&
                userRoomData.map((elementdata, index) => {
                  return (
                    <div key={index} className="inline pr-[.5em]">
                      {console.log("element data is: ", elementdata)}
                      <JamRoomBubble roomdata={elementdata} />
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
