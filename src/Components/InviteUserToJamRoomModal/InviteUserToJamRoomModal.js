import React, { useState, useEffect } from "react";
import axios from "axios";

export const InviteUserToJamRoomModal = ({ removeModal, chatroomId }) => {
  const [tokenAuth, setTokenAuth] = useState(null);
  const [textField, setTextField] = useState({ invitedUserId: "" });

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
    if (textField.invitedUserId !== "") {
      console.log(textField.invitedUserId);

      let invitedUser = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/chatrooms/addUserToChatroom`,
        {
          chatroomId: chatroomId,
          username: textField.invitedUserId,
        },
        { headers: { Authorization: tokenAuth } }
      );

      alert("Invited the User!");
      removeModal();
    } else {
      alert("Please Invite A User!");
    }
  };

  return (
    <>
      <div className="absolute flex flex-col top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] lg:w-[30%] h-[40%] lg:h-[40%] bg-white rounded-md border py-[2em] px-[1em] shadow-sm z-[90] gap-[2em]">
        <div>
          <p className="text-txtcolor-primary font-bold text-center pb-[1em] text-xl border-b-[1px] border-slate-200">
            INVITE USER
          </p>
        </div>
        <div className="flex flex-row justify-center mt-[10%] lg:mt-[5%]">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="invitedUserId"
              onChange={handleTextChange}
              value={textField.invitedUserId}
              autoComplete="off"
              placeholder="INVITE A USER"
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
            value="INVITE"
            onClick={handleCreateRoom}
            className="secondary-cta-btn w-[100%] lg:w-[100%]"
          />
        </div>
      </div>
    </>
  );
};
