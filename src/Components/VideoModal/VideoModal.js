import React, { useState } from "react";

export const VideoModal = ({ videourl }) => {
  return (
    <>
      <div className="absolute flex flex-col justify-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] lg:w-[40%] h-[80%] bg-white rounded-md border py-[2em] px-[1em] shadow-sm z-[90] gap-[1em]">
        <div className="flex flex-row h-full w-full justify-center ">
          <div className="my-[.5em] rounded-lg overflow-hidden">
            <video controls className="h-full object-fit">
              <source src={videourl} type="video/mp4" className="object-fit" />
            </video>
          </div>
        </div>
      </div>
    </>
  );
};
