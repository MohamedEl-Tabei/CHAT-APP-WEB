import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

const ChatFriend = ({ friend }) => {
  const user = useSelector((s) => s.user);
  return (
    <div
      className={`w-100 d-flex align-items-center pointer py-3 bg-none text-user shadow`}
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
        className="ms-auto  me-3"
        style={{ opacity: user.connectWith._id === friend._id ? 1 : 0 }}
        icon={faPaperPlane}
      />
    </div>
  );
};

export default ChatFriend;
