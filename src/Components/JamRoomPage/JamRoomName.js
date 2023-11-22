import React, { useState } from "react";
import axios from "axios";
import {
    CheckCircleIcon,
    XCircleIcon,
    PencilSquareIcon,
} from "@heroicons/react/20/solid";

export function JamRoomName({ storedRoomName, chatroomId }) {
    const [roomName, setRoomName] = useState(storedRoomName ? storedRoomName : null);
    const [isBeingEdited, setIsBeingEdited] = useState(false);

    const writeData = async () => {
        console.log('running')
        if (!roomName) {
            alert('Please enter a room name')
        } else {
            setIsBeingEdited(false);
            axios.put(`${process.env.REACT_APP_BACKEND_URL}/chatrooms/${chatroomId}`,
                {
                    name: roomName,
                },
                {
                    headers: { Authorization: localStorage.getItem("token") },
                });
        }
    };

    const revertData = () => {
        setIsBeingEdited(false);
        setRoomName(storedRoomName);
    };

    return (
        <h1 className="font-bold text-txtcolor-primary text-[1.5rem] justify-center balance flex flex-row  ">
            {isBeingEdited ?
                <div className = 'flex flex-row'>
                    <input
                        type="text"
                        id="editRoomName"
                        placeholder="Room Name"
                        value={roomName}
                        size = '10'
                        onChange={(e) => setRoomName(e.target.value)}
                    />
                    <div className="flex flex-row">
                        <label for={`confirmButton-roommname`}>
                            <CheckCircleIcon className="h-6 w-6 text-green-500 cursor-pointer" />
                        </label>
                        <button
                            id={`confirmButton-roomname`}
                            style={{ display: "none" }}
                            onClick={writeData}
                        />
                        <label for={`rejectButton-roomname`}>
                            <XCircleIcon className="h-6 w-6 text-red-500 cursor-pointer" />
                        </label>
                        <button
                            id={`rejectButton-roomname`}
                            style={{ display: "none" }}
                            onClick={() => {
                                revertData();
                            }}
                        />
                    </div>
                </div>
                : roomName}
            <label for={`editButton-roomname`} >
                {isBeingEdited ? null : <PencilSquareIcon className="h-6 w-6 text-gray-500 cursor-pointer" />}
            </label>
            <button onClick={() => setIsBeingEdited(true)} id={`editButton-roomname`} style={{ display: "none" }} />
        </h1>
    );
}
