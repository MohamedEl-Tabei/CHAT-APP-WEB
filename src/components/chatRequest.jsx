import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useContext, useState } from "react";
import {SocketIO} from "../app"
const ChatRequest = ({ newFriend }) => {
  const user = useSelector((s) => s.user);
  const [display,setDisplay]=useState(true)
  const socket=useContext(SocketIO)
  const onRequest=()=>{
    socket.emit("sendRequest",newFriend._id,user._id)
    setDisplay(false)
  }
  return (
    <td
      className={`w-100 d-${display?"flex":"none"} align-items-center  bg-none text-user shadow p-3 border-0`}
    >
      <img
              src={"https://i.ibb.co/0RdPPt8v/296fe121-5dfa-43f4-98b5-db50019738a7.jpg"}
        // src={newFriend.image}
        width="40"
        height="40"
        className="d-inline-block align-top rounded-circle border border-light border-3 me-2"
        alt="Profile"
      />
      <span>{newFriend.name}</span>
      <Button onClick={onRequest} className="ms-auto" variant="outline-primary" size="sm">Request</Button>
    </td>
  );
};

export default ChatRequest;
