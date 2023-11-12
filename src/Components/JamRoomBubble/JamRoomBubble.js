import React, { useState } from "react";

export const JamRoomBubble = ({ roomdata }) => {
  const handleClick = () => {
    console.log(
      "navigate to that chatroom! maybe a modal? But modal means you can't have a shortcut to that room via the URL. let's think abt it"
    );
  };

  /**
   * All the info will come from BE, and passed in as an object.
   * so probably the displayed info below will be like:
   * {roomdata.name} , {roomdata.genre} etc, we'll see
   */

  return (
    <>
      <div
        className="w-[full] min-h-[7em] bg-white rounded-md border py-[1em] px-[1em] shadow-sm scale-100 transition-all origin-left hover:scale-[102%] active:scale-[97%]"
        onClick={handleClick}
      >
        <h1 className="font-semibold text-[1.2rem] text-slate-700">
          Room Name
        </h1>
        <p className="font-medium text-[1.2rem] text-txtcolor-primary">
          genres blablabla
        </p>
        <p className="font-medium text-black">Looking For:</p>
        <p>Guitarists, Bassists</p>

        <p className="pt-[1em]">
          some description of the jam, maybe just shitposting or talk about how
          often they wanna meet up etc. Maybe this entire text visiblity is
          removed when smaller screens so it's more readable
        </p>
      </div>
    </>
  );
};
