import React, { useEffect, useState } from "react";

export const SpeechBubble = ({ messagedata, index, userinfo }) => {
  const handleClick = () => {
    console.log(
      "maybe functionality to edit messages in a modal? low priority!"
    );
    // console.log(messagedata);
    console.log("user info is: ", userinfo);
  };

  const handleClickProfilePicture = () => {
    console.log("check out the profile of the guy");
  };

  return (
    <>
      <div
        className="h-[3rem] mr-[1em] lg:w-[4rem] lg:h-[4rem] rounded-[50%] overflow-hidden border border-slate-200 scale-100 transition-all active:scale-95"
        onClick={handleClickProfilePicture}
      >
        <img
          src={userinfo.profilePictureUrl}
          alt="face"
          className="h-[100%] w-[100%] object-cover"
        />
      </div>

      <div
        className="w-[70%] md:w-[60%] lg:w-[60%] bg-white rounded-md border py-[1em] px-[1em] shadow-sm scale-100 transition-all origin-left active:scale-[97%]"
        onClick={handleClick}
      >
        <p className="font-medium text-[1rem] text-txtcolor-primary text-left">
          {userinfo && userinfo.fullName}
          {/* id: {messagedata && messagedata.authorId} */}
        </p>
        <h1 className="font-medium text-slate-700 pb-[1em] border-b-[1px] mb-[.5em]">
          {messagedata && messagedata.content}
        </h1>
        <div>
          <p className="text-right text-xs">Sent at:</p>{" "}
          <p className="text-xs text-slate-500 text-right ">
            {messagedata && messagedata.createdAt}
          </p>
        </div>
      </div>
    </>
  );
};
