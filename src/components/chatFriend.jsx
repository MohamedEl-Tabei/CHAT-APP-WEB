import { faCircle,  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { SocketIO } from "../app";

const ChatFriend = ({ friend }) => {
  const [isOnline,setIsOnline]=useState(friend.socketId?.length)
  const socket=useContext(SocketIO)
  useEffect(() => {
    socket.on("isOnline", (friendId) => {
      if (friendId === friend._id) setIsOnline(true);
    });
    socket.on("isOffline", (friendId) => {
      if (friendId === friend._id) setIsOnline(false);
    });
  }, [friend._id,socket]);
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
      <span>{friend.name}</span>
      <FontAwesomeIcon
        className={`ms-auto  me-3`}
        icon={faCircle}
        size="lg"
        style={{fontSize:"8px",color:isOnline?"#04f600":"gray"}}
      />
    </td>
  );
};

export default ChatFriend;
