import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Import Components
import { SpeechBubble } from "../Components/SpeechBubble/SpeechBubble";

// Import Sockets
// import { io } from "socket.io-client"; // io is a function to call an individual socket. the package for frontend(client side) is npm i socket.io-client
// const socket = io(`http://localhost:8080`);

export const SingleJamRoomPage = () => {
  const [roomData, setRoomData] = useState("");
  const [userMessage, setUserMessage] = useState({});

  const { chatroomId } = useParams();

  const handleTextChange = (ev) => {
    let name = ev.target.name;
    let value = ev.target.value;

    setUserMessage((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmitMessage = (ev) => {
    ev.preventDefault();
    console.log(userMessage);
    // socket.emit("send-message", userMessage, chatroomId);
  };

  // The URL of the backend goes into the socket
  // const socket = io(`${process.env.REACT_APP_BACKEND_URL}`); // Doesnt work, Express server is on 8000. So we'll use 8080 for sockets.
  // socket.on("connect", () => {
  //   console.log(`You connected with id: ${socket.id}`);
  // });

  // socket.on("receive-message", (message) => {
  //   console.log(message);
  // });

  const dummyData = [
    {
      id: 1,
      author_id: 1,
      chatroom_id: 1,
      content: "Hey mate, how's it going? Let's talk about music!",
      createdAt: "2023-11-13T08:15:00.000Z",
    },
    {
      id: 2,
      author_id: 1,
      chatroom_id: 1,
      content: "Sure thing! I'm really into jazz. What's your favorite genre?",
      createdAt: "2023-11-13T09:30:00.000Z",
    },
    {
      id: 3,
      author_id: 2,
      chatroom_id: 1,
      content:
        "Hey! I love jazz too. Miles Davis is my favorite. How about you?",
      createdAt: "2023-11-13T10:45:00.000Z",
    },
    {
      id: 4,
      author_id: 2,
      chatroom_id: 1,
      content:
        "I also enjoy rock music, especially classic rock bands like Led Zeppelin.",
      createdAt: "2023-11-13T12:00:00.000Z",
    },
    {
      id: 5,
      author_id: 3,
      chatroom_id: 1,
      content:
        "Nice choices! Personally, I'm a fan of electronic music, particularly techno.",
      createdAt: "2023-11-13T13:15:00.000Z",
    },
    {
      id: 6,
      author_id: 1,
      chatroom_id: 1,
      content:
        "Electronic music is cool! Do you have any favorite techno artists?",
      createdAt: "2023-11-13T14:30:00.000Z",
    },
    {
      id: 7,
      author_id: 3,
      chatroom_id: 1,
      content:
        "Absolutely! I love listening to artists like Carl Cox and Nina Kraviz.",
      createdAt: "2023-11-13T15:45:00.000Z",
    },
    {
      id: 8,
      author_id: 2,
      chatroom_id: 1,
      content:
        "I've been meaning to explore more techno. Any specific tracks you recommend?",
      createdAt: "2023-11-13T17:00:00.000Z",
    },
    {
      id: 9,
      author_id: 3,
      chatroom_id: 1,
      content:
        "Sure thing! Check out 'Strobe' by Deadmau5 and 'Spaceman' by Hardwell.",
      createdAt: "2023-11-13T18:15:00.000Z",
    },
    {
      id: 10,
      author_id: 1,
      chatroom_id: 1,
      content: "Thanks for the recommendations! I'll give them a listen.",
      createdAt: "2023-11-13T19:30:00.000Z",
    },
    // Add more messages as needed
  ];

  // Make a separate axios.get to get information about specific jamroom.
  useEffect(() => {
    // getJamRoomInfo();
    setRoomData(dummyData);
  }, []);

  const getJamRoomInfo = async () => {
    // let jamRoomInfo = await axios
    //   .get
    //   // Need to create a Backend process for this
    //   // `${process.env.REACT_APP_BACKEND_URL}/users/${usersPrimaryKey}/joinedChatrooms`
    //   ();
    // if (jamRoomInfo.data.success === true) {
    //   setRoomData(jamRoomInfo);
    // } else {
    //   // alert("Unable to get chatroom information");
    //   console.log("Unable to get chatroom information");
    // }
  };

  return (
    <>
      <div className="flex flex-row justify-center h-[100dvh] pt-[2em] pb-[4em] px-[2em] ">
        <div className="flex flex-col w-full lg:w-[30%] justify-between overflow-x-hidden overflow-y-auto">
          <div className="flex flex-col pt-[2em] mb-[-10em] h-[100%]">
            <h1 className="font-bold text-txtcolor-primary text-[1.5rem] pb-[1em] text-left">
              JAM ROOM TITLE SHOULD GO HERE
            </h1>

            {/* <button
              onClick={() => {
                console.log(`chat id is ${chatId}. `);
                console.log(`chat data is id is ${roomData}. `);
              }}
              className="bg-red-500 px-2 py-1"
            >
              View room data state
            </button>
            <br /> */}

            {/* Sorting message left and right by user logged in */}
            <div className="pr-[1.5em] h-[80%] mb-[1em] border-b-[1px] border-slate-300 overflow-y-auto">
              {roomData &&
                roomData.map((elementdata, index) => {
                  if (elementdata.author_id === 1) {
                    // console.log("true");
                    return (
                      <>
                        <div
                          key={index}
                          className="flex flex-row justify-end pb-[1em]"
                        >
                          <SpeechBubble
                            messagedata={elementdata}
                            index={index}
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
                          />
                        </div>
                      </>
                    );
                })}
            </div>

            <div className="flex flex-col justify-end h-[20%] gap-[1em] pr-[1.5em] text-right">
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
                  className="bg-fill-secondary px-[1em] text-white font-semibold rounded-md active:outline-none scale-100 transition-all active:scale-95"
                >
                  SEND
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
