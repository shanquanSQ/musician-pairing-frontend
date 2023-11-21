import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

// Import Icons
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";

// Import Components
import { JamRoomBubble } from "../Components/JamRoomBubble/JamRoomBubble";

// Import Modals
import { CreateJamRoomModal } from "../Components/CreateJamRoomModal/CreateJamRoomModal";
import { JoinJamRoomModal } from "../Components/JoinJamRoomModal/JoinJamRoomModal";

// Import Sockets
import { io } from "socket.io-client"; // io is a function to call an individual socket. the package for frontend(client side) is npm i socket.io-client
const socket = io(`http://localhost:8080`);

export const JamChatroomPage = ({ motion }) => {
  const [tokenAuth, setTokenAuth] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [userId, setUserId] = useState("");
  const [loadFlag, setLoadFlag] = useState(false);

  const [createRoomModalToggle, setCreateRoomModalToggle] = useState(false);
  const [joinRoomModalToggle, setJoinRoomModalToggle] = useState(false);

  const [userRoomData, setUserRoomData] = useState(null);
  // Each item will be multiple columns of the rooms table, so it will be a list of objects instead.
  // Will need to check JamRoomBubble component to see what data we want to display on the page

  const myRef = useRef(null);

  useEffect(() => {
    let TOKEN = localStorage.getItem("token");
    setTokenAuth(TOKEN);
    // MUST save the token first, so that it will be passed into HEADER when you make axios calls.
  }, []);

  useEffect(() => {
    if (tokenAuth) {
      // console.log("getting current user");
      const getCurrentUser = async () => {
        let currentUserInfo = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/users/getCurrentUser`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        setCurrentUser(currentUserInfo.data.user);
        setUserId(currentUserInfo.data.user.id);

        setIsAuthenticated(true);
      };
      getCurrentUser();
    }

    // console.log("exit ");
  }, [tokenAuth]);

  useEffect(() => {
    if (tokenAuth && isAuthenticated) {
      // console.log("start step 2");
      getRoomData();
    }
  }, [isAuthenticated, tokenAuth]);

  useEffect(() => {
    socket.on("new-room-created", () => {
      console.log("refreshing room data");

      if (userId) {
        getRoomData();
      }
    });
  }, [socket, userId]);

  // useEffect(() => {
  //   scrollBottom();
  //   // setLoadFlag(false);
  // }, [loadFlag]);

  // WIP. Optional Function, can ignore
  const scrollBottom = () => {
    let divElement = myRef.current;
    if (divElement && divElement.lastChild) {
      divElement.lastChild.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end",
      });
    }
  };

  const getRoomData = async () => {
    let userRoomInformation = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/users/joinedChatrooms`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );

    if (userRoomInformation.data.success === true) {
      setUserRoomData(userRoomInformation.data.data);
    } else {
      alert("Unable to get user's joined room data.");
    }
  };

  /**
   * Modal Handlers
   * */

  // Create Room Modals
  const handleCreateRoom = async () => {
    setCreateRoomModalToggle(!createRoomModalToggle);
  };
  const removeModal = () => {
    setCreateRoomModalToggle(false);
  };

  // Join Room Modals
  const handleJoinRoom = async () => {
    setJoinRoomModalToggle(!joinRoomModalToggle);
  };
  const removeJoinRoomModal = () => {
    setJoinRoomModalToggle(false);
  };

  return (
    <>
    {/* {console.log(userRoomData)} */}
      <div className="flex flex-row justify-center h-[100dvh] pt-[2em] pb-[4em] px-[2em] ">
        <div className="flex flex-col w-full lg:w-[30%] justify-between overflow-x-hidden overflow-y-auto">
          <div className="flex flex-col pt-[2em] mb-[-10em]">
            <div className="flex flex-row w-[100%] justify-start font-bold text-txtcolor-primary text-[1.5rem] pb-[1em] text-left">
              <div className="w-[80%] ">JOINED JAM ROOMS</div>

              <div className=" w-[30%] lg:w-[25%] flex flex-row items-end justify-between mr-[1em]">
                <PlusCircleIcon
                  className="h-6 w-6 text-slate-600 -translate-y-[3px] origin-center scale-[120%] transition-all active:scale-100 hover:cursor-pointer"
                  onClick={handleCreateRoom}
                />
                <SquaresPlusIcon
                  className="h-6 w-6 text-slate-600 inline lg:ml-[3em] -translate-y-[3px] origin-center scale-[120%] transition-all active:scale-100 hover:cursor-pointer"
                  onClick={handleJoinRoom}
                />
              </div>
            </div>
{/*             
            <button
              onClick={() => {
                console.log(userRoomData);
              }}
              className="bg-red-500 px-2 py-1"
            >
              View room data state
            </button>
            <br /> */}

            <div ref={myRef} className="pr-[2em]">
              {userRoomData &&
                userRoomData.map((elementdata, index) => {
                  return (
                    <div key={index} className="inline pr-[.5em]">
                      {/* {console.log("element data is: ", elementdata)} */}
                      <JamRoomBubble roomdata={elementdata} />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {/* MODALS GO HERE */}
      {createRoomModalToggle && (
        <CreateJamRoomModal removeModal={removeModal} userId={userId} />
      )}
      {createRoomModalToggle && (
        <div
          onClick={removeModal}
          className="fixed top-0 left-0 w-[100vw] h-full bg-black z-[9] transition-all opacity-50"
        ></div>
      )}

      {joinRoomModalToggle && (
        <JoinJamRoomModal removeModal={removeJoinRoomModal} userId={userId} />
      )}
      {joinRoomModalToggle && (
        <div
          onClick={removeJoinRoomModal}
          className="fixed top-0 left-0 w-[100vw] h-full bg-black z-[9] transition-all opacity-50"
        ></div>
      )}
    </>
  );
};
