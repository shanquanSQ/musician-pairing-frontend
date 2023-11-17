import React, { useState } from "react";
import axios from "axios";
import { storage } from "../../firebase/firebase.js";
import { ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  CheckCircleIcon,
  XCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import { BACKEND_URL } from "../../constants.js";

export function ProfilePic({ isOwnPage, displayedUserId, storedURL }) {
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState(storedURL);
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  const writeData = async () => {
    setIsBeingEdited(false);
    //alert('insert code to write current pic to database')

    const fileRef = sRef(storage, `profilepics/${displayedUserId}`);
    uploadBytes(fileRef, profilePicture)
      .then(() => getDownloadURL(fileRef))
      .then((url) => {
        axios.put(`${BACKEND_URL}/users/${displayedUserId}`, {
          profilePictureUrl: url,
        });
      });
  };

  const revertData = () => {
    setIsBeingEdited(false);
    setProfilePictureURL(storedURL);
  };

  return (
    <div className="flex flex-col items-center pb-[2em]">
      <div className="w-[15em] h-[15em] rounded-lg overflow-hidden">
        <label
          htmlFor="profile-picture"
          className={`${isOwnPage && "cursor-pointer"}`}
        >
          <img
            src={
              profilePictureURL
                ? profilePictureURL
                : "https://firebasestorage.googleapis.com/v0/b/dev-portfolio-sq.appspot.com/o/random%2Fnapoleon-dynamite36641.jpeg?alt=media&token=436c7b15-7324-4311-9fb1-ccab8e0b7d56"
            }
            alt="Profile photo"
            className="h-full object-cover"
          />
        </label>
        {isOwnPage ? (
          <input
            type="file"
            id="profile-picture"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              setProfilePicture(e.target.files[0]);
              setProfilePictureURL(URL.createObjectURL(e.target.files[0]));
              setIsBeingEdited(true);
            }}
          />
        ) : null}
      </div>
      {isBeingEdited ? (
        <div className="flex flex-row p-2">
          <p className="mx-2"> Confirm new profile picture? </p>
          <label for={`confirmButton-profilePic`}>
            <CheckCircleIcon className="h-6 w-6 text-green-500 cursor-pointer" />
          </label>
          <button
            id={`confirmButton-profilePic`}
            style={{ display: "none" }}
            onClick={() => {
              writeData();
            }}
          />
          <label for={`rejectButton-profilePic`}>
            <XCircleIcon className="h-6 w-6 text-red-500 cursor-pointer" />
          </label>
          <button
            id={`rejectButton-profilePic`}
            style={{ display: "none" }}
            onClick={() => {
              revertData();
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
