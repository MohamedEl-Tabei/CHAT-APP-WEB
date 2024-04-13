import {
  faCheck,
  faCheckDouble,
  faCircle,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { SocketIO } from "../app";
import { useSelector } from "react-redux";
import REQUEST from "../api";

const ChatFriend = ({ friend }) => {
  const [isOnline, setIsOnline] = useState(friend.socketId?.length);
  const socket = useContext(SocketIO);
  const user = useSelector((s) => s.user);
  const [lastMessage, setLastMessage] = useState(undefined);
  const [numberOfMessages, setNumberOfMessages] = useState(0);
  useEffect(() => {
    socket.on("isOnline", (friendId) => {
      if (friendId === friend._id) setIsOnline(true);
    });
    socket.on("isOffline", (friendId) => {
      if (friendId === friend._id) setIsOnline(false);
    });
  }, [friend._id, socket]);
  useEffect(() => {
    if (friend._id === user.connectWith._id) {
      setNumberOfMessages(0);
    }
  }, [friend._id, user.connectWith]);
  useEffect(() => {
    var count = 0;
    user.messageNotifications.forEach((element) => {
      count = element === friend._id ? count + 1 : count;
    });
    setNumberOfMessages(friend._id === user.connectWith._id ? 0 : count);
    if (friend._id === user.connectWith._id) {
      (async () => {
        await REQUEST.CHATAPP_API.post(
          "user/deleteMessageNotifications",
          { id: friend._id },
          {
            headers: {
              "x-auth-token": user.token,
            },
          }
        );
      })();
    }
  }, [user.messageNotifications, user.token, user.connectWith._id, friend._id]);
  useEffect(() => {
    socket.on("receiveMessage", (newMessage, senderId) => {
      if (senderId === friend._id) {
        setNumberOfMessages(
          senderId === user.connectWith._id ? 0 : numberOfMessages + 1
        );
        setLastMessage(newMessage);
      }
    });
    socket.on("getMessage", (newMessage) => {
      if (newMessage.reciever === friend._id) setLastMessage(newMessage);
    });
    socket.on("yourMessageSeen", (allMessages) => {
      let newMessage=allMessages[allMessages.length-1]
      if (newMessage.reciever === friend._id) setLastMessage(newMessage);
    });
  }, [socket, friend._id, numberOfMessages, user.connectWith._id]);
  useEffect(() => {
    (async () => {
      let response = await REQUEST.CHATAPP_API.post(
        "user/getLastMessage",
        { id: friend._id },
        {
          headers: {
            "x-auth-token": user.token,
          },
        }
      );
      setLastMessage(await response.data);
    })();
  }, [friend._id, user.token]);

  return (
    <td
      className={`w-100 d-flex align-items-center pointer py-3 bg-none text-user shadow border-0 px-4`}
    >
      <img
        src={friend.image}
        width="40"
        height="40"
        className="d-inline-block align-top rounded-circle border border-light border-3 me-2"
        alt="Profile"
      />
      <span className="d-flex flex-column ms-3 me-2">
        <span>{friend.name}</span>
        <span style={{ fontSize: 10 }}>
          {lastMessage?.sender === user._id ? (
            <FontAwesomeIcon
              className="me-1"
              icon={lastMessage?.isSeen ? faCheckDouble : faCheck}
            />
          ) : (
            ""
          )}
          {lastMessage?.text?.slice(0, 15)}
          {lastMessage?.text?.length > 15 ? "..." : ""}
        </span>
      </span>
      <span
        className={`${
          !numberOfMessages ? "d-none" : "d-flex"
        } ms-2 bg-dandger fw-bold  position-relative justify-content-center align-items-center text-light `}
        style={{ width: 20, height: 20, fontSize: 10, position: "relative" }}
      >
        <FontAwesomeIcon
          className="text-danger"
          style={{ fontSize: 25, position: "absolute", top: 1 }}
          icon={faMessage}
        />
        <span className="position-relative">{numberOfMessages}</span>
      </span>
      <span className="d-flex flex-column ms-auto me-2">
        <span style={{ fontSize: 10 }}>
          {lastMessage?.createdAt?.slice(0, 10)}
        </span>
        <span className="ms-auto">
          <FontAwesomeIcon
            icon={faCircle}
            size="lg"
            style={{ fontSize: "8px", color: isOnline ? "#04f600" : "gray" }}
          />
        </span>
      </span>
    </td>
  );
};

export default ChatFriend;
