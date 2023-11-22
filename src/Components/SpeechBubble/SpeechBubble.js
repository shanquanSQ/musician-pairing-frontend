import React, { useEffect, useState } from "react";
import {timeConversion} from "../../utilities.js"

// Import Modals
import { ProfileIconModal } from "../ProfileIconModal/ProfileIconModal";
import { VideoModal } from "../VideoModal/VideoModal";

// Import Icons
import { ArrowsPointingOutIcon } from "@heroicons/react/24/solid";

export const SpeechBubble = ({
  messagedata,
  index,
  userinfo,
  attachmentinfo,
  currentUserId,
}) => {
  const [videoModalToggle, setVideoModalToggle] = useState(false);
  const [profileInfoToggle, setProfileInfoToggle] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Used to troubleshoot inputs into each mapped element
  const handleClick = () => {
    // console.log(messagedata);
    // console.log(currentUserId);
    // console.log("attachment info is: ", attachmentinfo);
    console.log("user info is: ", userinfo);
  };

  const handleClickProfilePicture = () => {
    console.log("check out the profile of the guy");
    setProfileInfoToggle(!profileInfoToggle);
  };

  const removeModal = () => {
    setProfileInfoToggle(false);
  };

  const handleVideoToggle = () => {
    setVideoModalToggle(!videoModalToggle);
  };

  const removeVideoModal = () => {
    setVideoModalToggle(false);
  };

  const togglePlayVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
    if (isVideoPlaying) {
      document.getElementById(messagedata.id).play();
    } else {
      document.getElementById(messagedata.id).pause();
    }
  };

  return (
    <>
      {/* Profile Picture Bubble on Left - Current User */}
      {userinfo && currentUserId === userinfo.id ? (
        <div
          className="h-[3rem] w-[3rem] mr-[1em] lg:w-[4rem] lg:h-[4rem] rounded-[50%] overflow-hidden border border-slate-200 scale-100 transition-all active:scale-95 hover:cursor-pointer"
          onClick={handleClickProfilePicture}
        >
          <img
            src={userinfo && userinfo.profilePictureUrl}
            alt="face"
            className="h-[100%] w-[100%] object-cover"
          />
        </div>
      ) : null}

      {/* Speech Bubble */}
      <div
        className="w-[70%] md:w-[60%] lg:w-[60%] bg-white rounded-md border py-[1em] px-[1em] shadow-sm hover:cursor-pointer"
        onClick={handleClick}
      >
        <h1 className="font-medium text-[1rem] text-txtcolor-primary text-left">
          {userinfo && userinfo.fullName}
        </h1>

        <div className="flex flex-row w-full justify-center">
          {attachmentinfo === undefined
            ? null
            : attachmentinfo.fileType === "video/mp4" && (
                <>
                  <div className="relative flex flex-row w-full justify-center">
                    <div className="aspect-square max-w-[90%] my-[.5em] lg:rounded-[50%] rounded-lg overflow-hidden scale-100 transition-all active:scale-95 hover:cursor-pointer">
                      <video
                        id={messagedata.id}
                        onClick={togglePlayVideo}
                        loop
                        className="h-full w-full object-cover border"
                      >
                        <source
                          src={attachmentinfo.attachmentUrl}
                          type="video/mp4"
                        />
                      </video>
                    </div>

                    <button
                      className="absolute bottom-0 right-[10%] w-[1.5em] h-[1.5em] lg:w-[2em] lg:h-[2em] rounded-[50%] border bg-slate-300 border-white  z-[30] scale-100 transition-all hover:scale-110 hover:cursor-pointer active:scale-95 focus:outline-none"
                      onClick={handleVideoToggle}
                    >
                      <ArrowsPointingOutIcon className="text-slate-600 scale-75" />
                    </button>
                  </div>
                </>
              )}

          {attachmentinfo === undefined
            ? null
            : (attachmentinfo.fileType === "image/jpeg" ||
                attachmentinfo.fileType === "image/png" ||
                attachmentinfo.fileType === "image/gif") && (
                <>
                  <div className="relative max-h-[15em] w-[full] rounded-lg my-[.5em] overflow-hidden scale-100 transition-all active:scale-95 hover:cursor-pointer">
                    <img
                      src={attachmentinfo.attachmentUrl}
                      alt="uploaded"
                      className="h-[100%] w-[100%] object-cover"
                      onClick={() => {
                        window.open(attachmentinfo.attachmentUrl);
                      }}
                    />
                  </div>
                </>
              )}
        </div>

        <p className="font-medium text-slate-700 pb-[1em] border-b-[1px] mb-[.5em]">
          {messagedata && messagedata.content}
        </p>
        <div>
          <p className="text-right text-xs">Sent at:</p>{" "}
          <p className="text-xs text-slate-500 text-right ">
            {messagedata && timeConversion(messagedata.createdAt)}
          </p>
        </div>
      </div>

      {/* Profile Picture Bubble on Right - Other Users */}
      {userinfo && currentUserId !== userinfo.id ? (
        <div
          className="h-[3rem] w-[3rem] ml-[1em] lg:w-[4rem] lg:h-[4rem] rounded-[50%] overflow-hidden border border-slate-200 scale-100 transition-all active:scale-95 hover:cursor-pointer"
          onClick={handleClickProfilePicture}
        >
          <img
            src={userinfo && userinfo.profilePictureUrl}
            alt="face"
            className="h-[100%] w-[100%] object-cover"
          />
        </div>
      ) : null}

      {/* MODALS GO HERE */}
      {profileInfoToggle && (
        <ProfileIconModal userinfo={userinfo} removeModal={removeModal} />
      )}

      {profileInfoToggle && (
        <div
          onClick={removeModal}
          className="fixed top-0 left-0 w-[100vw] h-full bg-black z-[9] transition-all opacity-50"
        ></div>
      )}

      {videoModalToggle && (
        <VideoModal videourl={attachmentinfo.attachmentUrl} />
      )}

      {videoModalToggle && (
        <div
          onClick={removeVideoModal}
          className="fixed top-0 left-0 w-[100vw] h-full bg-black z-[9] transition-all opacity-50"
        ></div>
      )}
    </>
  );
};
