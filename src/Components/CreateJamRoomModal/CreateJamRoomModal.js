import React, { useState, useEffect } from "react";
import axios from "axios";

// Import Sockets
import { io } from "socket.io-client"; // io is a function to call an individual socket. the package for frontend(client side) is npm i socket.io-client
const socket = io(`http://localhost:8080`);

export const CreateJamRoomModal = ({ userId, removeModal }) => {
  const [tokenAuth, setTokenAuth] = useState(null);
  const [textField, setTextField] = useState({ roomname: "" });

  useEffect(() => {
    let TOKEN = localStorage.getItem("token");
    console.log("get token: ", TOKEN);
    setTokenAuth(TOKEN);
  }, []);

  const handleTextChange = (ev) => {
    let name = ev.target.name;
    let value = ev.target.value;

    setTextField((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const handleCreateRoom = async () => {
    if (textField.roomname !== "") {
      console.log("yay");
      console.log(tokenAuth);
      console.log(userId);
      console.log(textField.roomname);

      let createRoom = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/createNewChatroom`,
        {
          userId: userId,
          name: textField.roomname,
        },
        { headers: { Authorization: tokenAuth } }
      );

      socket.emit("created-new-chatroom");

      alert("Room Created!");
      removeModal();
    } else {
      alert("Please give a room name!");
    }
  };

  return (
    <>
      <div className="absolute flex flex-col top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] lg:w-[30%] h-[50%] lg:h-[40%] bg-white rounded-md border py-[2em] px-[1em] shadow-sm z-[90] gap-[2em]">
        <div>
          <p className="text-txtcolor-primary font-bold text-center pb-[1em] text-xl border-b-[1px] border-slate-200">
            CREATE A JAM ROOM
          </p>
        </div>
        <div className="flex flex-row justify-center mt-[10%] lg:mt-[5%]">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="roomname"
              onChange={handleTextChange}
              value={textField.roomname}
              autoComplete="off"
              placeholder="JAM ROOM NAME?"
              className="primary-input-form text-center"
            />

            <button
              type="submit"
              onClick={handleCreateRoom}
              className="opacity-0"
            />
          </form>
        </div>

        <div>
          <input
            type="button"
            value="CREATE JAM ROOM"
            onClick={handleCreateRoom}
            className="secondary-cta-btn w-[100%] lg:w-[100%]"
          />
        </div>
      </div>
    </>
  );
};
