import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LandingPage = ({ motion }) => {
  const [loadedVideo, setLoadedVideo] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("login");
  };

  return (
    <>
      <div className="flex flex-row justify-center h-[100dvh] pt-[2em] pb-[4em] px-[2em] relative">
        {loadedVideo && (
          <motion.div
            className="flex flex-col w-full justify-between text-center overflow-hidden "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.6,
              duration: 0.5,
            }}
          >
            <h1 className="font-bold text-[3rem] pt-[1.5em] lg:pt-[3em]">
              SESSIONS
            </h1>

            <div>
              <input
                type="button"
                value="SIGN IN"
                onClick={handleClick}
                className="primary-cta-btn w-[100%] lg:w-[50%] "
              />
            </div>
          </motion.div>
        )}

        <div className="video-wrapper">
          <video
            id="videosrc"
            src="https://firebasestorage.googleapis.com/v0/b/dev-portfolio-sq.appspot.com/o/random%2Fpexels-brixiv-6462451%20(360p).mp4?alt=media&token=9b9eb18d-fcb2-46f4-9c74-f8f0ea2428a5"
            autoPlay
            loop
            muted
            onLoadedData={() => {
              setLoadedVideo(true);
            }}
            style={{
              opacity: loadedVideo ? 1 : 0,
              transition: "opacity, 500ms ease-in",
            }}
          />
        </div>

        {/* <div className="">
          <svg
            height="100%"
            width="100%"
            className="absolute bottom-0 lg:bottom-[0] left-[50%] translate-x-[-50%] z-[-1] fill-[#2B6CAA]"
          >
            <circle cx="50%" cy="110%" r="60%" />
          </svg>

          <svg
            height="100%"
            width="100%"
            className="absolute bottom-0 lg:bottom-[0] left-[50%] translate-x-[-50%] z-[-1] fill-[#FFB800]"
          >
            <circle cx="50%" cy="110%" r="50%" />
          </svg>

          <svg
            height="100%"
            width="100%"
            className="absolute bottom-0 lg:bottom-[0] left-[50%] translate-x-[-50%] z-[-1] fill-[#AB3257]"
          >
            <circle cx="50%" cy="110%" r="40%" />
          </svg>
        </div> */}
      </div>

      {/* FFB800 82D144 */}
    </>
  );
};
