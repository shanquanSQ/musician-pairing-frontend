import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

// Import Firebase Db and Methods
import { storage } from "../../firebase/firebase.js"; // Reference to Firebase Storage Db
import { ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage"; // Get Firebase Storage Methods

export const AttachmentModal = ({ userinfo, removeModal }) => {
  const [uploadedFile, setUploadFile] = useState({
    fileInputFile: null,
  });

  const STORAGE_KEY = "userattachments/"; // This corresponds to the Firebase branch/document

  const submitData = () => {
    // Create a reference to the full path of the file. This path will be used to upload to Firebase Storage
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
        getDownloadURL(storageRef, uploadedFile.fileInputFile.name).then(
          (fileUrl) => writeData(fileUrl)
        );
      });
    }
  };

  // functions to push to Database
  const writeData = (photoURL) => {
    // ev.preventDefault();
    console.log("writeData function: ", photoURL);

    // if (state.messageText !== "") {
    //   const messageListRef = ref(realTimeDatabase, DB_MESSAGES_KEY);
    //   const newMessageRef = push(messageListRef);
    //   // Sets a key - assigned by Firebase - for a NEW branch in Firebase

    //   // Need to seperate per user, give it an ID and create a new item in the list
    //   set(newMessageRef, {
    //     text: state.messageText,
    //     timestamp: new Date().toTimeString(),
    //     fileURL: photoURL,

    //     likes: 0,
    //     // comments: [],

    //     userUID: userLoggedIn,
    //     userEmail: userLoggedInEmail,
    //   });

    //   navigate("/");
    // } else {
    //   alert("You need to enter a caption as well!");
    // }
  };

  return (
    <>
      <div className=" absolute flex flex-col top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] lg:w-[30%] h-[80%] bg-white rounded-md border py-[2em] px-[1em] shadow-sm z-[90] gap-[1em]">
        <p className="text-txtcolor-primary font-bold text-center pb-[1em] text-xl border-b-[1px] border-slate-200">
          ATTACH
        </p>

        <div className="flex flex-col justify-center w-[100%] h-[100%] bg-slate-300 rounded-[3%] overflow-hidden">
          {uploadedFile.fileInputFile === null ||
          uploadedFile.fileInputFile === undefined ? (
            <h1 className="text-center">Upload An Image or Video</h1>
          ) : (
            <img
              src={URL.createObjectURL(uploadedFile.fileInputFile)}
              alt={URL.createObjectURL(uploadedFile.fileInputFile).toString()}
              className="w-[100%] h-[100%] object-cover"
            />
          )}
        </div>

        <form className="text-center">
          {/* some kind of pre-processing is already done, so fileInputValue doesnt need to be */}
          <input
            type="file"
            name="fileUpload"
            value={uploadedFile.fileInputValue}
            onChange={(ev) => {
              // console.log(ev.target.files);
              setUploadFile({
                fileInputFile: ev.target.files[0],
                fileInputValue: ev.target.fileUpload,
              });
            }}
            className="file-input file-input-bordered file w-full max-w-xs "
          />
        </form>

        <button
          onClick={() => {
            console.log(uploadedFile.fileInputFile.type);
          }}
        >
          check
        </button>

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
