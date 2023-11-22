import React, { useState } from "react";
import axios from "axios";
import {
  CheckCircleIcon,
  XCircleIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";
import { BACKEND_URL } from "../../constants.js";

export function Bio({ isOwnPage, displayedUserId, storedBio }) {
  const [bio, setBio] = useState(storedBio ? storedBio : null);
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  const writeData = async () => {
    console.log(bio)
    setIsBeingEdited(false);
    axios.put(
      `${BACKEND_URL}/users/${displayedUserId}`,
      {
        bio,
      },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
  };

  const revertData = () => {
    setIsBeingEdited(false);
    setBio(storedBio);
  };

  return (
    <div className="font-bold text-slate-800 text-sm flex flex-col  ">
      <div className="flex flex-row">
        <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left">
          BIO
        </h1>
        <label for={`editButton-bio`}>
          {isOwnPage && !isBeingEdited ? (
            <PencilSquareIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
          ) : null}
        </label>
        {isBeingEdited ? (
          <div className="flex flex-row">
            <label for={`confirmButton-bio`}>
              <CheckCircleIcon className="h-6 w-6 text-green-500 cursor-pointer" />
            </label>
            <button
              id={`confirmButton-bio`}
              style={{ display: "none" }}
              onClick={() => {
                writeData();
              }}
            />
            <label for={`rejectButton-bio`}>
              <XCircleIcon className="h-6 w-6 text-red-500 cursor-pointer" />
            </label>
            <button
              id={`rejectButton-bio`}
              style={{ display: "none" }}
              onClick={() => {
                revertData();
              }}
            />
          </div>
        ) : null}
        <button
          onClick={() => setIsBeingEdited(true)}
          id={`editButton-bio`}
          style={{ display: "none" }}
        />
      </div>
      {isBeingEdited ? (
        <div>
          <textarea
            type="text"
            id="editBio"
            placeholder="Bio"
            value={bio}
            rows="6"
            cols="50"
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
      ) : (
        bio
      )}
    </div>
  );
}
