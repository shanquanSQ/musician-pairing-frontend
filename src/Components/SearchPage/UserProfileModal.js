import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import {Username} from "../../Components/ProfilePage/Username"
import {Bio} from "../../Components/ProfilePage/Bio"
import {InstrumentTable} from "../../Components/ProfilePage/InstrumentTable"
import {ArtistList} from "../../Components/ProfilePage/ArtistList"
import {GenreList} from "../../Components/ProfilePage/GenreList"
import { BACKEND_URL } from "../../constants.js";

export const UserProfileModal = ({ pageOwnerUserId, removeModal }) => {
    const [pageOwnerInfo, setPageOwnerInfo] = useState(null)
    const [isOwnPage, setIsOwnPage] = useState(false); 
    const [textField, setTextField] = useState({ roomname: "" });

    useEffect(()=>{
        const getUserInfo = async () => {
          const pageOwnerInfo = await axios.get(`${BACKEND_URL}/users/${pageOwnerUserId}`,{
            headers: { Authorization: localStorage.getItem("token") },
        })
          setPageOwnerInfo(pageOwnerInfo.data.user)
        }
       getUserInfo()
      },[])

      const numberOfSessions = "65";
      const uniqueCollaborators = "30";

      const handleCreateRoomForTwo = async () => {
        const createdRoom = await axios.post(
          `${BACKEND_URL}/users/createNewChatroomForTwo`,
          {
            //userId:'the currently logged in user',
            secondUserId: pageOwnerUserId,
            name: textField.roomname,
            genresPlayed: '',
            instrumentsWanted: '',
          },
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        removeModal()
      };

      const handleTextChange = (ev) => {
        let name = ev.target.name;
        let value = ev.target.value;
    
        setTextField((prevState) => {
          return { ...prevState, [name]: value };
        });
      };

  return (
    <>
      <div className="overflow-y-auto absolute flex flex-col top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] lg:w-[30%] h-[80%] bg-white rounded-md border py-[2em] px-[1em] shadow-sm z-[90] gap-[1em]">
        <div className="flex flex-row w-full h-[30%]  justify-center">
          <div className="aspect-square mr-[1em] rounded-[50%] overflow-hidden ">
            <img
              src={pageOwnerInfo ? pageOwnerInfo.profilePictureUrl : null}
              alt="face"
              className="h-[100%] w-[100%] object-cover"
            />
          </div>
        </div>
        
        

        <div className="flex flex-col items-center h-[100%] gap-[1em]  ">
          <div className="flex flex-col gap-[1em] h-[100%] lg:w-[100%] md:w-[70%] w-[100%] px-[2em] ">
          {pageOwnerInfo ?
        <Username isOwnPage={isOwnPage} displayedUserId={pageOwnerUserId} storedUsername = {pageOwnerInfo.fullName} />
        :null}
        <InstrumentTable isOwnPage = {isOwnPage} displayedUserId = {pageOwnerUserId}/>
        

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
          {pageOwnerInfo ? 
            <Bio isOwnPage={isOwnPage} displayedUserId={pageOwnerUserId} storedBio = {pageOwnerInfo.bio} />
            :null}

            <GenreList isOwnPage={isOwnPage} displayedUserId={pageOwnerUserId} />
            <ArtistList isOwnPage={isOwnPage} displayedUserId={pageOwnerUserId} />

            <div>
              <input
                type="button"
                value="Create Room"
                onClick={handleCreateRoomForTwo}
                className="secondary-cta-btn w-[100%] lg:w-[100%]"
              />
               <input
              type="text"
              name="roomname"
              onChange={handleTextChange}
              value={textField.roomname}
              autoComplete="off"
              placeholder="JAM ROOM NAME?"
              className="primary-input-form text-center"
            />
            </div>
          </div>
        </div>

        <div
          className="fixed top-[1em] right-[1em] hover:cursor-pointer"
          onClick={removeModal}
        >
          <XMarkIcon className="h-6 w-6 text-txtcolor-secondary" />
        </div>
      </div>
      {/* <div className = 'h-[70%] lg:w-[100%] overflow-y-auto items-center'>
      </div> */}
    </>
  );
};
