import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {CfmRejButton} from "../Components/Buttons/CfmRejButton"
import {EditButton} from "../Components/Buttons/EditButton"
import {DeleteButton} from "../Components/Buttons/DeleteButton"
import {ProfilePic} from "../Components/ProfilePage/ProfilePic"
import {InstrumentTable} from "../Components/ProfilePage/InstrumentTable"

export const ProfilePage = ({ motion }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Dummy User here')
  const [editedFields, setEditedFields] = useState(new Set())
  const [isOwnPage, setIsOwnPage] = useState(true); //this will later setup depending on whether username on page matches login user

  useEffect(()=>{
    const getAllUserInfo = async () => {
      const [user, instruments, genres, artists, personalclips] = await Promise.all([

      ])
    }
    
    //might need to do a if user exists
    /* 
    pull for current user:
    -All data from users table
    -All data from instruments, users_instruments, genres, artists, songs, personal_video_clips table

    */

  },[])
  // Lists will probably come from server as a prop.
  // Not sure if server request will be done here or in parent component.
  
  const genreList = ["Rock", "Pop", "Hip Hop", "Electronic", "Jazz", "Country"];

  const artistsList = [
    "John Mayer",
    "Katy Perry",
    "Taylor Swift",
    "Joe Hisaishi",
    "Elvis Presley",
    "Spongebob OST",
  ];

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

              <ProfilePic isOwnPage={isOwnPage} displayedUserId='4' storedURL = "https://firebasestorage.googleapis.com/v0/b/dev-portfolio-sq.appspot.com/o/random%2Fnapoleon-dynamite36641.jpeg?alt=media&token=436c7b15-7324-4311-9fb1-ccab8e0b7d56" />

              <h1 className="font-bold text-slate-800 text-[2rem] flex flex-row  ">
              {editedFields.has('username') ? 
              <div>
              <input
                type="text"
                id="editUsername"
                placeholder="Name"
                value = {userName}
                onChange = {(e)=>setUserName(e.target.value)}
              />
              <CfmRejButton field = 'username' type='confirm' setEditedFields = {setEditedFields} clickFunc={() => { alert('insert code for submitting to BE') }} />
              <CfmRejButton field = 'username' type='reject' setEditedFields = {setEditedFields} clickFunc={() => { alert('insert code for resetting to original input') }} />
              </div>
              :userName}
                <EditButton field = "username" editedFields = {editedFields} setEditedFields = {setEditedFields} isOwnPage={isOwnPage} />
              </h1>
            </div>

            <InstrumentTable isOwnPage = {isOwnPage} displayedUserId = '4'/>

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

            <div>
              <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left ">
                FAVOURITE GENRES
              </h1>
              <div className="text-[1.5rem] font-semibold leading-[1.2em] pr-[1em]">
                {genreList.map((element, index) => {
                  return (
                    <div key={index} id={element} className="inline pr-[.5em]">
                      {element.toUpperCase()} /
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left ">
                FAVOURITE ARTISTS
              </h1>
              <div className="text-[1.5rem] font-semibold leading-[1.2em] pr-[1em]">
                {artistsList.map((element, index) => {
                  return (
                    <div key={index} id={element} className="inline pr-[.5em]">
                      {element.toUpperCase()} /
                    </div>
                  );
                })}
              </div>
            </div>

            {/* LOGOUT BUTTON */}
            <div className="pt-[1.5em]">
              <form>
                <input
                  type="button"
                  value="EDIT INFO"
                  onClick={() => {
                    alert("edit the info");
                  }}
                  className="secondary-cta-btn w-[100%] lg:w-[100%]"
                />
              </form>

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
          {/* 
          <div className="flex flex-col">
            <h1 className="font-bold text-txtcolor-primary text-[1.5rem] text-left">
              Stuffz
            </h1>
          </div> */}
        </div>
      </div>
    </>
  );
};
