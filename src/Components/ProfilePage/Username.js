import React, { useState } from "react";
import axios from "axios";
import {
    CheckCircleIcon,
    XCircleIcon,
    PencilSquareIcon,
} from "@heroicons/react/20/solid";
import { BACKEND_URL } from "../../constants.js";

export function Username({ isOwnPage, displayedUserId, storedUsername }) {
    const [username, setUsername] = useState(storedUsername ? storedUsername : null);
    const [isBeingEdited, setIsBeingEdited] = useState(false);

    const writeData = async () => {
        if(!username) {
            alert('Please enter a username')
        } else {
        setIsBeingEdited(false);
        axios.put(`${BACKEND_URL}/users/${displayedUserId}`,
            {
                fullName: username,
            },
            {
                headers: { Authorization: localStorage.getItem("token") },
            });
        }
    };

    const revertData = () => {
        setIsBeingEdited(false);
        setUsername(storedUsername);
    };

    return (
        <h1 className="font-bold text-slate-800 text-[2rem] flex flex-row  ">
            {isBeingEdited ?
                <div>
                    <input
                        type="text"
                        id="editUsername"
                        placeholder="Full Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="flex flex-row">
                        <label for={`confirmButton-username`}>
                            <CheckCircleIcon className="h-6 w-6 text-green-500 cursor-pointer" />
                        </label>
                        <button
                            id={`confirmButton-username`}
                            style={{ display: "none" }}
                            onClick={() => {
                                writeData();
                            }}
                        />
                        <label for={`rejectButton-username`}>
                            <XCircleIcon className="h-6 w-6 text-red-500 cursor-pointer" />
                        </label>
                        <button
                            id={`rejectButton-username`}
                            style={{ display: "none" }}
                            onClick={() => {
                                revertData();
                            }}
                        />
                    </div>
                </div>
                : username}
            <label for={`editButton-username`} >
                {(isOwnPage && !isBeingEdited) ? <PencilSquareIcon className="h-6 w-6 text-gray-500 cursor-pointer" /> : null}
            </label>
            <button onClick={() => setIsBeingEdited(true)} id={`editButton-username`} style={{ display: "none" }} />
        </h1>
    );
}
