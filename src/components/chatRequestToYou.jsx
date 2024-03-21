import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { SocketIO } from "../app";
const ChatRequestToYou = ({ newFriend }) => {
  const user = useSelector((s) => s.user);
  const socket = useContext(SocketIO);
  const onCancle = () => {
    socket.emit("cancel", newFriend._id, user._id);
  };
  return (
    <div
      className={`w-100 d-flex align-items-center  bg-none text-user shadow p-3 border-0 mb-3 position-relative`}
    >
      <img
        src={newFriend.image}
        width="40"
        height="40"
        className="d-inline-block align-top rounded-circle border border-light border-3 me-2"
        alt="Profile"
      />
      <div
        style={{
          top: 0,
          opacity: user.requestNotifications.includes(newFriend._id) ? 1 : 0,
        }}
        className="position-absolute text-danger"
      >
        •
      </div>
      <span>{newFriend.name}</span>
      <div className="ms-auto">
        <Button
          onClick={onCancle}
          className="me-2"
          variant="outline-success"
          size="sm"
        >
          Accept
        </Button>
        <Button onClick={onCancle} variant="outline-danger" size="sm">
          Refuse
        </Button>
      </div>
    </div>
  );
};

export default ChatRequestToYou;
