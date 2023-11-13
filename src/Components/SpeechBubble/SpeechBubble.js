import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export const SpeechBubble = ({ messagedata, index }) => {
  const handleClick = () => {
    console.log(
      "maybe functionality to edit messages in a modal? low priority!"
    );
  };

  return (
    <>
      <div
        className="w-[80%] lg:w-[60%] min-h-[7em] bg-white rounded-md border py-[1em] px-[1em] shadow-sm scale-100 transition-all origin-left active:scale-[97%]"
        onClick={handleClick}
      >
        <h1 className="font-medium text-slate-700">
          {messagedata && messagedata.content}
        </h1>
        <p className="font-medium text-[1.2rem] text-txtcolor-primary">
          author_id: {messagedata && messagedata.author_id}
        </p>

        <p className="text-sm text-slate-500">
          {messagedata && messagedata.createdAt}
        </p>
      </div>
    </>
  );
};
