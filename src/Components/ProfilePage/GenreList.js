import React, { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import axios from "axios";
import { BACKEND_URL } from "../../constants.js";

export function GenreList({ isOwnPage, displayedUserId }) {
  const [genresList, setGenresList] = useState([]);
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [newGenre, setNewGenre] = useState("");

  useEffect(() => {
    const getGenreInfo = async () => {
      const genreInfo = await axios.get(
        `${BACKEND_URL}/users/${displayedUserId}/genres`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setGenresList(genreInfo.data.genreInterests.map((genre) => genre.name)); // check what's in genreInfo
    };
    getGenreInfo();
  }, []);

  const writeData = async () => {
    setIsBeingEdited(false);
    await axios.put(
      `${BACKEND_URL}/users/${displayedUserId}/genres`,
      { genresList },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
  };

  const revertData = async () => {
    const genreInfo = await axios.get(
      `${BACKEND_URL}/users/${displayedUserId}/genres`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    setIsBeingEdited(false);
    setGenresList(genreInfo.data.genreInterests);
  };

  const addGenre = () => {
    setGenresList((prevState) => {
      prevState.push(newGenre);
      return [...prevState];
    });
    setNewGenre("");
  };

  const removeGenre = (index) => {
    console.log(index);
    setGenresList((prevState) => {
      prevState.splice(index, 1);
      console.log(prevState);
      return [...prevState];
    });
  };

  const genreText = genresList.map((genre, index) => {
    return (
      <div className="flex flex-row" key={index} id={genre}>
        {genre.toUpperCase() + " "}
        {isBeingEdited ? (
          <div>
            <label for={`deleteGenre-${index}`}>
              <TrashIcon class="h-6 w-6 text-gray-500 cursor-pointer" />
            </label>
            <button
              onClick={() => removeGenre(index)}
              id={`deleteGenre-${index}`}
              style={{ display: "none" }}
            />
          </div>
        ) : null}
        /&nbsp;
      </div>
    );
  });

  const newGenreInput = (
    <div className="flex flex-row">
      <input
        placeholder="Genre"
        type="text"
        name="genre"
        id="name"
        size="10"
        value={newGenre}
        onChange={(e) => {
          setNewGenre(e.target.value);
        }}
      />
      <label for={`addGenre`}>
        <PlusCircleIcon class="h-6 w-6 text-gray-500 cursor-pointer" />
      </label>
      <button
        onClick={() => addGenre()}
        id={`addGenre`}
        style={{ display: "none" }}
      />
    </div>
  );

  return (
    <div>
      <div className="flex flex-row">
        <h1 className="font-bold text-txtcolor-primary text-[1.2rem] text-left ">
          FAVOURITE GENRES
        </h1>
        <label for={`editButton-genres`}>
          {isOwnPage && !isBeingEdited ? (
            <PencilSquareIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
          ) : null}
        </label>
        <button
          onClick={() => setIsBeingEdited(true)}
          id={`editButton-genres`}
          style={{ display: "none" }}
        />
        {isBeingEdited ? (
          <div className="flex flex-row">
            <label for={`confirmButton-genres`}>
              <CheckCircleIcon className="h-6 w-6 text-green-500 cursor-pointer" />
            </label>
            <button
              id={`confirmButton-genres`}
              style={{ display: "none" }}
              onClick={() => {
                writeData();
              }}
            />
            <label for={`rejectButton-genres`}>
              <XCircleIcon className="h-6 w-6 text-red-500 cursor-pointer" />
            </label>
            <button
              id={`rejectButton-genres`}
              style={{ display: "none" }}
              onClick={() => {
                revertData();
              }}
            />
          </div>
        ) : null}
      </div>
      <div className="text-[1.5rem] font-semibold leading-[1.2em] pr-[1em]">
        {genreText}
      </div>
      {isBeingEdited ? newGenreInput : null}
    </div>
  );
}
