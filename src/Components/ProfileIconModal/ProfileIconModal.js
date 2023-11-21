import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

export const ProfileIconModal = ({ userinfo, removeModal }) => {
  return (
    <>
      <div className=" absolute flex flex-col top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] lg:w-[30%] h-[80%] bg-white rounded-md border py-[2em] px-[1em] shadow-sm z-[90] gap-[1em]">
        <div className="flex flex-row w-full h-[50%]  justify-center">
          <div className="aspect-square mr-[1em] rounded-[50%] overflow-hidden ">
            <img
              src={userinfo && userinfo.profilePictureUrl}
              alt="face"
              className="h-[100%] w-[100%] object-cover"
            />
          </div>
        </div>

        <div className="text-txtcolor-primary text-[2rem] font-bold text-center">
          {userinfo.fullName}
        </div>

        <div className="flex flex-col items-center h-[100%] gap-[1em] overflow-y-auto ">
          <div className="flex flex-col gap-[1em] h-[100%] lg:w-[70%] md:w-[70%] w-[100%] px-[2em] ">
            <div>
              <p className="text-black font-semibold text-sm">Bio:</p>
              {userinfo.bio}
            </div>

            <div>
              <p className="text-black font-semibold text-sm">Experience:</p>
              {userinfo.experience}
            </div>
          </div>
        </div>

        <div>
          <input
            type="button"
            value="INVITE USER"
            onClick={() => {
              console.log("Add User to the Jam Room!");
            }}
            className="secondary-cta-btn w-[100%] lg:w-[100%] "
          />
        </div>

        <div
          className="fixed top-[1em] right-[1em] hover:cursor-pointer"
          onClick={removeModal}
        >
          <XMarkIcon className="h-6 w-6 text-txtcolor-secondary" />
        </div>
      </div>
    </>
  );
};
