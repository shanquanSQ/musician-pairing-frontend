import React, { useState, useEffect } from "react";
import axios from "axios";

export const UsersInRoomModal = ({ removeModal, roomusers }) => {
  return (
    <>
      <div className="absolute flex flex-col top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] lg:w-[30%] h-[50%] lg:h-[40%] bg-white rounded-md border py-[2em] px-[1em] shadow-sm z-[90] gap-[2em]">
        <div>
          <p className="text-txtcolor-primary font-bold text-center pb-[1em] text-xl border-b-[1px] border-slate-200">
            USERS IN ROOM
          </p>
        </div>

        <div className="flex flex-col font-medium pt-[1em] text-center h-[80%] overflow-y-scroll">
          {roomusers &&
            roomusers.map((element, index) => {
              return (
                <>
                  <div>{element.fullName}</div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};
