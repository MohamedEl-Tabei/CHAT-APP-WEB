import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { SocketIO } from "../app";
const ChatRequestFromYou = ({ newFriend }) => {
  const user = useSelector((s) => s.user);
  const socket = useContext(SocketIO);
  const [display, setDisplay] = useState(true);
  const onCancle = () => {
    socket.emit("cancelRequest", newFriend._id, user._id);
    setDisplay(false);
  };
  useEffect(() => {
    socket.on("error", (e) => console.log(e));
  }, [socket]);
  useEffect(() => {
    socket.on("requestRefused", (id) => {
      setDisplay(!(id.toString() === newFriend._id.toString()));
    });
  }, [newFriend._id, socket]);
  return (
    <div
      className={`w-100 d-${
        display ? "flex" : "none"
      } align-items-center  bg-none text-user shadow p-3 border-0 mb-3`}
    >
      <img
        src={newFriend.image}
        width="40"
        height="40"
        className="d-inline-block align-top rounded-circle border border-light border-3 me-2"
        alt="Profile"
      />
      <span>{newFriend.name}</span>
      <Button
        onClick={onCancle}
        className="ms-auto"
        variant="outline-danger"
        size="sm"
      >
        Cancel
      </Button>
    </div>
  );
};

export default ChatRequestFromYou;
