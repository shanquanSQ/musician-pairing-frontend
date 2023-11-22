import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";

// Import Firebase Db and Methods
import { storage } from "../../firebase/firebase.js"; // Reference to Firebase Storage Db
import { ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage"; // Get Firebase Storage Methods

// Import Sockets
import { io } from "socket.io-client"; // io is a function to call an individual socket. the package for frontend(client side) is npm i socket.io-client
const socket = io(process.env.REACT_APP_BACKEND_URL);

export const AttachmentModal = ({
  userId,
  removeModal,
  chatroomId,
  refreshAttachments,
}) => {
  const [tokenAuth, setTokenAuth] = useState(null);
  const [uploadedFile, setUploadFile] = useState({
    fileInputFile: null,
  });

  const [userMessage, setUserMessage] = useState("");

  const STORAGE_KEY = `userattachments/user${userId}/chatroom${chatroomId}/`; // This corresponds to the Firebase branch/document
  const ACCEPTED_IMAGE_FORMATS = ["image/jpeg", "image/png", "image/gif"];
  const ACCEPTED_VIDEO_FORMATS = ["video/mp4"];

  // let chatroomId;
  // let { chatroomId } = useParams();

  useEffect(() => {
    let TOKEN = localStorage.getItem("token");
    setTokenAuth(TOKEN);
  }, []);

  const handleTextChange = (ev) => {
    let name = ev.target.name;
    let value = ev.target.value;

    setUserMessage((prevState) => {
      return { ...prevState, [name]: value };
    });

    socket.emit("user-typing", userId);
  };

  const handleSubmitMessage = (ev) => {
    ev.preventDefault();
    postNewMessage(); // All Consecutive Functions have to go in here (AXIOS GET -> AXIOS GET -> AXIOS POST)

    console.log("DONE!");
  };

  const postNewMessage = async () => {
    let uploadURL;
    let newMessage;

    /**
     * POST Message -> Get Message Primary Key -> POST Image
     * */

    if (userMessage) {
      // POST message to Database
      newMessage = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/postNewMessage`,
        {
          // userId: userId,
          chatroomId: chatroomId,
          content: userMessage.message,
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      );

      // Q: NOT SURE WHY WE DON'T NEED TO SET STATE HERE. It duplicates for some reason.
      // setRoomData((prevState) => {
      //   return [...prevState, newMessage.data.data];
      // });

      // Upload Photo Image to Firebase, get the URL
      if (
        uploadedFile.fileInputFile === undefined ||
        uploadedFile.fileInputFile === null
      ) {
        alert("You need to upload a picture!");
      } else {
        const storageRef = sRef(
          storage,
          STORAGE_KEY + uploadedFile.fileInputFile.name
        );
        // console.log(uploadedFile.fileInputFile.name);
        uploadBytes(storageRef, uploadedFile.fileInputFile).then((snapshot) => {
          console.log("uploaded a file!");
          getDownloadURL(storageRef, uploadedFile.fileInputFile.name)
            .then((fileUrl) => (uploadURL = fileUrl))
            .then(async () => {
              // POST the attachment-message relationship

              let newAttachment = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/users/postMessageAttachment`,
                {
                  mediaURL: uploadURL,
                  messageId: newMessage.data.data.id,
                  chatroomId: chatroomId,
                  fileType: uploadedFile.fileInputFile.type,
                },
                { headers: { Authorization: tokenAuth } }
              );
              await refreshAttachments();
              if (chatroomId) {
                console.log("the chatroomID is : ", chatroomId);
                socket.emit("attachment-table-updated", chatroomId);
              }
            })
            .then(removeModal());
        });
      }

      socket.emit("send-message", newMessage.data.data, chatroomId);
    } else {
      alert("Please key in a message");
    }
  };

  return (
    <>
      <div className=" absolute flex flex-col top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] md:w-[50%] lg:w-[50%] h-[80%] bg-white rounded-md border py-[2em] px-[1em] shadow-sm z-[90] gap-[1em]">
        <p className="text-txtcolor-primary font-bold text-center pb-[1em] text-xl border-b-[1px] border-slate-200">
          ATTACH
        </p>

        <div className="flex flex-col justify-center w-[100%] h-[100%] bg-slate-300 rounded-[3%] overflow-hidden">
          {uploadedFile.fileInputFile !== null &&
          ACCEPTED_IMAGE_FORMATS.includes(uploadedFile.fileInputFile.type) ? (
            <img
              src={URL.createObjectURL(uploadedFile.fileInputFile)}
              alt={URL.createObjectURL(uploadedFile.fileInputFile).toString()}
              className="object-cover"
            />
          ) : null}

          {
            uploadedFile.fileInputFile !== null &&
            ACCEPTED_VIDEO_FORMATS.includes(uploadedFile.fileInputFile.type) ? (
              <video controls className="h-full object-contain">
                <source
                  src={URL.createObjectURL(uploadedFile.fileInputFile)}
                  type="video/mp4"
                  className="object-cover"
                />
              </video>
            ) : null
            // <h1 className="text-center">Upload An Image or Video</h1>
          }
        </div>

        <form id="docpicker" className="text-center mb-[2em]">
          {/* some kind of pre-processing is already done, so fileInputValue doesnt need to be */}
          <input
            id="fileinputform"
            type="file"
            name="fileUpload"
            value={
              uploadedFile.fileInputValue != null
                ? ""
                : uploadedFile.fileInputvalue
            }
            onChange={(ev) => {
              if (
                ev.target.files[0] &&
                (ACCEPTED_IMAGE_FORMATS.includes(ev.target.files[0].type) ||
                  ACCEPTED_VIDEO_FORMATS.includes(ev.target.files[0].type))
              ) {
                setUploadFile({
                  fileInputFile: ev.target.files[0],
                  fileInputValue: ev.target.fileUpload,
                });
              } else {
                alert("Only accepts JPEG/PNG/GIF and MP4!");
                setUploadFile({
                  fileInputFile: null,
                });
              }
            }}
            className="text-txtcolor-primary w-full max-w-xs"
          />
        </form>

        {uploadedFile.fileInputFile !== null ? (
          <>
            <div className="flex flex-col justify-end h-[20%] gap-[1em] mt-[1em] lg:mt-[.5em] pr-[1.5em] text-right">
              <div>
                <textarea
                  type="text"
                  name="message"
                  onChange={handleTextChange}
                  value={userMessage.message}
                  autoComplete="off"
                  placeholder="message"
                  className="bg-white w-[100%] h-[100%] p-[1em] rounded-md border-slate-400 border-[1px] focus:outline-none"
                />
              </div>
              <div>
                <button
                  onClick={handleSubmitMessage}
                  className="bg-fill-secondary px-[1em] py-[.2em] text-white font-semibold rounded-md active:outline-none scale-100 transition-all active:scale-95"
                >
                  SEND
                </button>
              </div>
            </div>
          </>
        ) : null}

        {/* <button
          onClick={() => {
            let item = document.getElementById("docpicker");

            console.log(item);
            console.log(uploadedFile);
          }}
        >
          check
        </button> */}

        {/* <div>
          <input
            type="button"
            value="UPLOAD"
            onClick={submitData}
            className="secondary-cta-btn w-[100%] lg:w-[100%]"
          />
        </div> */}

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
