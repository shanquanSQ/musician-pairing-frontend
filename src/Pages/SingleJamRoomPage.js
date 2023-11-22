import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Import Components
import { SpeechBubble } from "../Components/SpeechBubble/SpeechBubble";
import { JamRoomName } from "../Components/JamRoomPage/JamRoomName";
import { AttachmentModal } from "../Components/AttachmentModal/AttachmentModal";
import { UserPlusIcon } from "@heroicons/react/24/outline";

// Import Sockets
import { io } from "socket.io-client"; // io is a function to call an individual socket. the package for frontend(client side) is npm i socket.io-client
import { InviteUserToJamRoomModal } from "../Components/InviteUserToJamRoomModal/InviteUserToJamRoomModal";
import { UsersInRoomModal } from "../Components/UsersInRoomModal/UsersInRoomModal";

const socket = io(process.env.REACT_APP_BACKEND_URL);

let authToken;

export const SingleJamRoomPage = () => {
  const [tokenAuth, setTokenAuth] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [userId, setUserId] = useState(null);

  const [roomData, setRoomData] = useState("");
  const [roomMessageFlag, setRoomMessageFlag] = useState(false);
  const [roomDetails, setRoomDetails] = useState("");
  const [roomUsers, setRoomUsers] = useState("");
  const [roomAttachments, setRoomAttachments] = useState("");

  const [userMessage, setUserMessage] = useState("");
  const [currentTypingUser, setCurrentTypingUser] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // const [filterMethod, setFilterMethod] = useState((messageDetails) => {
  //   let list = [...roomUsers];
  //   let results = list.filter((item) => item.id == messageDetails.authorId);
  //   return "results";
  // });

  const [attachmentModalToggle, setAttachmentModalToggle] = useState(false);
  const [addUserModalToggle, setAddUserModalToggle] = useState(false);
  const [usersInRoomModalToggle, setUsersInRoomModalToggle] = useState(false);

  let { chatroomId } = useParams();

  // The URL of the backend goes into the socket
  //// const socket = io(`${process.env.REACT_APP_BACKEND_URL}`); // Doesnt work, Express server is on 8000. So we'll use 8080 for sockets.
  socket.on("connect", () => {
    console.log(`You connected with id: ${socket.id}`);
    // Need to send to server the CHAT ID.
  });

  // Make a separate axios.get to get information about specific jamroom.
  useEffect(() => {
    let TOKEN = localStorage.getItem("token");
    setTokenAuth(TOKEN);
    authToken = TOKEN;
  }, []);

  useEffect(() => {
    if (tokenAuth) {
      console.log("getting current user");
      const getCurrentUser = async () => {
        let currentUserInfo = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/users/getCurrentUser`,
          {
            headers: { Authorization: tokenAuth },
          }
        );
        setCurrentUser(currentUserInfo.data.user);
        setUserId(currentUserInfo.data.user.id);

        // console.log("currentUserInfo is ", currentUserInfo.data.user);
        // console.log("END STEP 1");

        setIsAuthenticated(true);
      };
      getCurrentUser();
    }

    // console.log("exit ");
  }, [tokenAuth]);

  useEffect(() => {
    console.log("join room ", chatroomId);
    socket.emit("join-room", chatroomId);
    if (tokenAuth && isAuthenticated) {
      console.log("STEP 2");
      getChatroomDetails();
      getChatroomInfo();
      getChatroomUsers();
      getChatroomAttachments();
    }
  }, [isAuthenticated, tokenAuth]);

  // Interval for checking user-typing emit from server
  useEffect(() => {
    let myInterval = setInterval(() => {
      setIsTyping(false);
    }, 4000);

    return () => {
      clearInterval(myInterval);
    };
  }, []);

  useEffect(() => {
    socket.on("receive-message", (receiveddata) => {
      console.log("received-message from server: ", receiveddata);
      setRoomData((prevState) => {
        return [...prevState, receiveddata];
      });
      console.log("received message");
    });

    socket.on("user-typing-response", (typinguser) => {
      console.log(`User of Id ${typinguser} is typing`);
      setIsTyping(true); // Displays typing message
      setCurrentTypingUser(typinguser);
    });

    socket.on("refresh-attachments", () => {
      // getChatroomInfo();
      // getChatroomAttachments();
      console.log("RUNNING");
      getChatroomInfo();
      getChatroomAttachments();
      getChatroomDetails();
      getChatroomUsers();
    });
  }, [socket]);

  const handleSubmitMessage = (ev) => {
    ev.preventDefault();
    postNewMessage();
  };

  /** BACKEND REQUESTS */
  const getChatroomInfo = async () => {
    console.log("tokenAuth outside: ", tokenAuth);
    if (tokenAuth) {
      console.log("token auth inside: ", tokenAuth);
      let updatedToken = localStorage.getItem("token");
      let chatroomInfo = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/chatrooms/${chatroomId}/getAllChatroomMessages`,
        {
          headers: { Authorization: updatedToken },
        }
      );

      if (chatroomInfo.data.success === true) {
        setRoomData(chatroomInfo.data.data);
        setRoomMessageFlag(true);
      } else {
        alert("Unable to get specific chatroom data.");
      }
    }
  };

  const getChatroomDetails = async () => {
    let chatroomDetails = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/chatrooms/${chatroomId}/getChatroomDetails`,
      {
        headers: { Authorization: tokenAuth },
      }
    );

    if (chatroomDetails.data.success === true) {
      setRoomDetails(chatroomDetails.data.data);
    } else {
      alert("Unable to get Chatroom Details");
    }
  };

  const getChatroomUsers = async () => {
    let allUsers = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/chatrooms/${chatroomId}/getAllChatroomUsers`,
      {
        headers: { Authorization: tokenAuth },
      }
    );

    if (allUsers.data.success === true) {
      setRoomUsers(allUsers.data.data);
    } else {
      alert("Unable to get Chatroom Details");
    }
  };

  const getChatroomAttachments = async () => {
    console.log("running get chatroom attachments");
    console.log("auth token in attachments: ", authToken);
    if (authToken) {
      let allAttachments = await axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/chatrooms/${chatroomId}/getAllChatroomAttachments`,
          {
            headers: { Authorization: authToken },
          }
        )
        .then((allAttachments) => {
          if (allAttachments.data.success === true) {
            console.log("SUCCESSFUL TRUE");
            setRoomAttachments(allAttachments.data.data);
            console.log("done room attachments");
          } else {
            console.log("Unable to get Chatroom Attachements");
          }
        });
    } else {
      console.log("STOPPED");
    }
  };

  const postNewMessage = async () => {
    if (userMessage) {
      let newMessage = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/postNewMessage`,
        {
          userId: userId,
          chatroomId: chatroomId,
          content: userMessage.message,
        },
        { headers: { Authorization: tokenAuth } }
      );

      // console.log("Sent your message!");
      setRoomData((prevState) => {
        return [...prevState, newMessage.data.data];
      });

      // console.log(`Sending message to backend: ${userMessage}`);
      // Need to send the entire Request Response rather than the state.
      socket.emit("send-message", newMessage.data.data, chatroomId);
    } else {
      console.log("Please key in a message");
    }
  };

  // Handle Text Input
  const handleTextChange = (ev) => {
    let name = ev.target.name;
    let value = ev.target.value;

    setUserMessage((prevState) => {
      return { ...prevState, [name]: value };
    });

    socket.emit("user-typing", userId, chatroomId);
  };

  // Filter Individual Message Details into each Speech Bubble.
  // (As opposed to each Speech Bubble making 1 BE call each, we re-use the information we called earlier)
  const checkUser = (messageDetails) => {
    let list = [...roomUsers];
    let results = list.filter((item) => item.id == messageDetails.authorId);
    return results;
  };

  const checkMessageId = (messageDetails) => {
    let list = [...roomAttachments];
    let results = list.filter((item) => item.messageId == messageDetails.id);
    return results;
  };

  const handleAttachmentModal = () => {
    setAttachmentModalToggle(!attachmentModalToggle);
  };

  const removeModal = () => {
    setAttachmentModalToggle(false);
  };

  const handleAddUserToRoomModal = () => {
    setAddUserModalToggle(!addUserModalToggle);
  };

  const removeAddUserModal = () => {
    setAddUserModalToggle(false);
  };

  const handleUsersInRoomModal = () => {
    setUsersInRoomModalToggle(!usersInRoomModalToggle);
  };

  const removeUsersInRoomModal = () => {
    setUsersInRoomModalToggle(false);
  };

  return (
    <>
      <div className="flex flex-row justify-center h-[100dvh] pt-[2em] pb-[4em] px-[2em] ">
        <div className="flex flex-col w-full gap-0 lg:w-[30%] justify-between overflow-x-hidden overflow-y-auto">
          <div className="flex flex-col pt-[0em] mb-[0em] h-[100%]">
            <h1
              className="font-bold text-txtcolor-primary text-[1.5rem] text-center balance scale-100 transition-all hover:cursor-pointer active:scale-95 origin-center"
              onClick={handleUsersInRoomModal}
            >
              {roomDetails && (
                <JamRoomName
                  storedRoomName={roomDetails.name}
                  chatroomId={chatroomId}
                />
              )}
            </h1>

            <div className="flex flex-row justify-center h-[10%] text-sm text-slate-800 text-center pt-1 pb-[1em] mb-0">
              <div className="flex flex-row justify-end b w-[90%] ">
                <UserPlusIcon
                  className="h-8 w-8 text-gray-500 origin-center scale-100 transition-all hover:scale-110 active:scale-95 "
                  onClick={handleAddUserToRoomModal}
                />
              </div>
            </div>

            {/* <button
              onClick={() => {
                console.log("HEY", filterMethod);
              }}
              className="bg-red-500 px-2 py-1"
            >
              View room data state
            </button>
            <br /> */}

            {/* Sorting message left and right by user logged in */}
            <div className="pr-[1.5em] h-[100%] mb-[1em] py-[1em] border-b-[1px] border-t-[1px] border-slate-300 overflow-y-auto">
              {roomData &&
                roomUsers &&
                roomData.map((elementdata, index) => {
                  if (elementdata.authorId === userId) {
                    return (
                      <>
                        <div
                          key={index}
                          className="flex flex-row justify-end pb-[1em]"
                        >
                          <SpeechBubble
                            messagedata={elementdata}
                            index={index}
                            userinfo={checkUser(elementdata)[0]}
                            attachmentinfo={checkMessageId(elementdata)[0]}
                            currentUserId={userId}
                          />
                        </div>
                      </>
                    );
                  } else
                    return (
                      <>
                        <div
                          key={index}
                          className="flex flex-row justify-start pb-[1em]"
                        >
                          <SpeechBubble
                            messagedata={elementdata}
                            index={index}
                            userinfo={checkUser(elementdata)[0]}
                            attachmentinfo={checkMessageId(elementdata)[0]}
                            currentUserId={userId}
                          />
                        </div>
                      </>
                    );
                })}
            </div>

            <div className="flex flex-col justify-end w-[100%] min-h-[1rem] text-center leading-0">
              {isTyping ? `User ${currentTypingUser} is typing...` : null}
            </div>

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
                  onClick={handleAttachmentModal}
                  className="bg-slate-700 px-[1em] py-[.2em] text-white font-semibold rounded-md active:outline-none scale-100 transition-all active:scale-95 mr-[1em]"
                >
                  UPLOAD
                </button>

                <button
                  onClick={handleSubmitMessage}
                  className="bg-fill-secondary px-[1em] py-[.2em] text-white font-semibold rounded-md active:outline-none scale-100 transition-all active:scale-95"
                >
                  SEND
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MODALS GO HERE */}
        {attachmentModalToggle && chatroomId && (
          <AttachmentModal
            removeModal={removeModal}
            userId={userId}
            setRoomData={setRoomData}
            chatroomId={chatroomId}
            refreshAttachments={getChatroomAttachments}
          />
        )}
        {attachmentModalToggle && (
          <div
            onClick={removeModal}
            className="fixed top-0 left-0 w-[100vw] h-full bg-black z-[9] transition-all opacity-50"
          ></div>
        )}

        {addUserModalToggle && (
          <InviteUserToJamRoomModal
            removeModal={removeAddUserModal}
            chatroomId={chatroomId}
          />
        )}
        {addUserModalToggle && (
          <div
            onClick={removeAddUserModal}
            className="fixed top-0 left-0 w-[100vw] h-full bg-black z-[9] transition-all opacity-50"
          ></div>
        )}

        {usersInRoomModalToggle && (
          <UsersInRoomModal
            removeModal={removeUsersInRoomModal}
            chatroomId={chatroomId}
            roomusers={roomUsers}
          />
        )}
        {usersInRoomModalToggle && (
          <div
            onClick={removeUsersInRoomModal}
            className="fixed top-0 left-0 w-[100vw] h-full bg-black z-[9] transition-all opacity-50"
          ></div>
        )}
      </div>
    </>
  );
};
