import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { SocketIO } from "../app";
const ChatRequestToYou = ({ newFriend }) => {
  const user = useSelector((s) => s.user);
  const socket = useContext(SocketIO);
  let [remove, setRemove] = useState(false)
  const onAccept = () => {
    socket.emit("acceptRequest", newFriend._id, user._id);
    setRemove(true)
  };
  const onRefuse = () => {
    socket.emit("refuseRequest", newFriend._id, user._id)
    setRemove(true)
  }
  return (
    <div
      className={`w-100 d-${remove ? "none" : "flex"} align-items-center  bg-none text-user shadow p-3 border-0 mb-3 position-relative`}
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
      <div className="ms-auto">
        <Button
          onClick={onAccept}
          className="me-2"
          variant="outline-success"
          size="sm"
        >
          Accept
        </Button>
        <Button onClick={onRefuse} variant="outline-danger" size="sm">
          Refuse
        </Button>
      </div>
    </div>
  );
};

export default ChatRequestToYou;
