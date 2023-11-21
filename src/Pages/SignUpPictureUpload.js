import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import Firebase Db and Methods
import { storage } from "../firebase/firebase.js"; // Reference to Firebase Storage Db
import { ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage"; // Get Firebase Storage Methods
import { BACKEND_URL } from "../constants.js";

export const SignUpPictureUpload = ({ motion }) => {
  const [tokenAuth, setTokenAuth] = useState(null);
  const [uploadedFile, setUploadFile] = useState({
    fileInputFile: null,
  });

  const navigate = useNavigate();

  const ACCEPTED_IMAGE_FORMATS = ["image/jpeg", "image/png", "image/gif"];
  // const STORAGE_KEY = `userattachments/user${userId}/chatroom${chatroomId}/`; // This corresponds to the Firebase branch/document
  const STORAGE_KEY = `userprofilepictures/`; // This corresponds to the Firebase branch/document

  useEffect(() => {
    let TOKEN = localStorage.getItem("token");
    console.log("get token: ", TOKEN);
    setTokenAuth(TOKEN);
  }, []);

  const handleSubmitMessage = (ev) => {
    postNewMessage(); // All Consecutive Functions have to go in here (AXIOS GET -> AXIOS GET -> AXIOS POST)
  };

  const postNewMessage = async () => {
    let uploadURL;
    let newMessage;

    /**
     * POST Message -> Get Message Primary Key -> POST Image
     * */

    if (uploadedFile.fileInputFile != null) {
      // POST Profile Picture to Corresponding user

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
              // POST - Add the profile picture to the corresponding user
              let newProfilePicture = await axios.post(
                `${BACKEND_URL}/users/addProfilePicture`,
                {
                  photoURL: uploadURL,
                },
                { headers: { Authorization: tokenAuth } }
              );
            })
            .then(() => {
              alert("Image Uploaded!");
              navigate("/additionaldetails");
            });
        });
      }
    } else {
      alert("Please Upload An Image!");
    }
  };

  return (
    <>
      <div className="flex flex-row justify-center h-[100dvh] pt-[2em] pb-[4em] px-[2em]">
        <motion.div
          className="flex flex-col w-full lg:w-[30%] justify-start text-center"
          initial={{ x: "20", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            delay: 0.1,
            type: "spring",
            mass: 0.4,
            damping: 8,
          }}
        >
          <div className="flex flex-col justify-center w-[100%] h-[60%] bg-slate-300 rounded-[3%] mb-[10%] overflow-hidden">
            {uploadedFile.fileInputFile !== null &&
            ACCEPTED_IMAGE_FORMATS.includes(uploadedFile.fileInputFile.type) ? (
              <img
                src={URL.createObjectURL(uploadedFile.fileInputFile)}
                alt={URL.createObjectURL(uploadedFile.fileInputFile).toString()}
                className="w-[100%] h-[100%] object-cover"
              />
            ) : null}
          </div>

          <div className="pb-[10%]">
            <form id="docpicker" className="text-center">
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
                    ACCEPTED_IMAGE_FORMATS.includes(ev.target.files[0].type)
                  ) {
                    setUploadFile({
                      fileInputFile: ev.target.files[0],
                      fileInputValue: ev.target.fileUpload,
                    });
                  } else {
                    alert("Only accepts JPEG/PNG");
                    console.log(
                      "Actually no input validation here. But media input validation is implemented for chat."
                    );
                    setUploadFile({
                      fileInputFile: null,
                    });
                  }
                }}
                className="text-txtcolor-primary w-full max-w-xs"
              />
            </form>
          </div>

          <button
            onClick={handleSubmitMessage}
            className="bg-fill-secondary px-[1em] py-[.2em] text-white font-semibold rounded-md active:outline-none scale-100 transition-all active:scale-95"
          >
            UPLOAD PROFILE PICTURE
          </button>
        </motion.div>
      </div>
    </>
  );
};
