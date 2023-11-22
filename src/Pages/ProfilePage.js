import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import {CfmRejButton} from "../Components/Buttons/CfmRejButton"
// import {EditButton} from "../Components/Buttons/EditButton"
// import {DeleteButton} from "../Components/Buttons/DeleteButton"
import { ProfilePic } from "../Components/ProfilePage/ProfilePic";
import { InstrumentTable } from "../Components/ProfilePage/InstrumentTable";
import { Username } from "../Components/ProfilePage/Username";
import { Bio } from "../Components/ProfilePage/Bio";
import { ArtistList } from "../Components/ProfilePage/ArtistList";
import { GenreList } from "../Components/ProfilePage/GenreList";
import axios from "axios";

export const ProfilePage = ({ motion, pageOwnerUserId, loggedInUserId }) => {
  // these are being set upon entry
  const [tokenAuth, setTokenAuth] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();
  const [isOwnPage, setIsOwnPage] = useState(true); //this will later setup depending on whether username on page matches login user
  const [pageOwnerInfo, setPageOwnerInfo] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      let currentUserInfo = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users/getCurrentUser`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setIsAuthenticated(true);
      setUserId(currentUserInfo.data.user.id);
    };
    getCurrentUser();

    // console.log("exit ");
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const getUserInfo = async () => {
        const pageOwnerInfo = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        ); // this should be pageOwnerUserId
        setPageOwnerInfo(pageOwnerInfo.data.user);
      };
      getUserInfo();
    }
  }, [isAuthenticated]);

  const numberOfSessions = "65";
  const uniqueCollaborators = "30";

  return (
    <>
      <div className="flex flex-row justify-center h-[100dvh] pt-[2em] pb-[4em] px-[2em] ">
        <div className="flex flex-col w-full lg:w-[30%] justify-between overflow-x-hidden overflow-y-auto ">
          <div className="flex flex-col pt-[2em] mb-[-10em] gap-[1.5em] lg:gap-[3em] ">
            <div className="">
              {/* <h1 className="font-bold text-txtcolor-primary text-[1.5rem] text-left ">
                PROFILE
              </h1> */}
              {pageOwnerInfo && userId ? (
                <div>
                  <ProfilePic
                    isOwnPage={isOwnPage}
                    displayedUserId={userId}
                    storedURL={pageOwnerInfo.profilePictureUrl}
                  />
                  <Username
                    isOwnPage={isOwnPage}
                    displayedUserId={userId}
                    storedUsername={pageOwnerInfo.fullName}
                  />
                </div>
              ) : null}
            </div>

            {userId && (
              <InstrumentTable
                isOwnPage={isOwnPage}
                displayedUserId={userId}
                token={tokenAuth}
              />
            )}

            {/* <button
              onClick={() => {
                console.log(pageOwnerInfo);
              }}
            >
              HELLO
            </button> */}

            <div className="flex flex-row flex-wrap gap-[3em]">
              <div>
                <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left">
                  SESSIONS
                </h1>
                <p className="text-[3rem] font-semibold leading-[1em]">
                  {numberOfSessions}
                </p>
              </div>

              <div>
                <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left ">
                  UNIQUE JAM BUDDIES
                </h1>
                <p className="text-[3rem] font-semibold leading-[1em]">
                  {uniqueCollaborators}
                </p>
              </div>
            </div>

            {pageOwnerInfo ? (
              <Bio
                isOwnPage={isOwnPage}
                displayedUserId={userId}
                storedBio={pageOwnerInfo.bio}
              />
            ) : null}

            {userId && (
              <GenreList
                isOwnPage={isOwnPage}
                displayedUserId={userId}
                token={tokenAuth}
              />
            )}
            {userId && (
              <ArtistList
                isOwnPage={isOwnPage}
                displayedUserId={userId}
                token={tokenAuth}
              />
            )}

            {/* LOGOUT BUTTON */}
            <div className="pt-[1.5em]">
              <form>
                <input
                  type="button"
                  value="LOGOUT"
                  onClick={() => {
                    navigate("/");
                  }}
                  className="secondary-cta-btn w-[100%] lg:w-[100%]"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
