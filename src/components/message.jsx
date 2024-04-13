import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble, faCheck } from "@fortawesome/free-solid-svg-icons";

const Message = ({ message }) => {
  const user = useSelector((s) => s.user);
  return (
    <div
      className={`d-flex flex-column my-1  ${
        user._id === message.sender ? "align-items-end" : ""
      }`}
    >
      <div
        className={` rounded-top-5 p-3 wmc shadow ${
          user._id === message.sender
            ? "bg-darkblue text-light rounded-start-5"
            : "bg-light rounded-end-5"
        }`}
        style={{ maxWidth: "100%" }}
      >
        <p className="p-1 pe-5 m-0" style={{ fontSize: "14px" }}>
          {message.text.slice(0, 7) === "http://"||message.text.slice(0, 8) === "https://" ? (
            <a style={{color:message.sender===user._id?"white":"blue"}} rel="noreferrer" target="_blank" href={message.text}>
              {message.text}
            </a>
          ) : (
            message.text
          )}
        </p>
        <div
          className="d-flex align-items-center ms-auto wmc p-1"
          style={{ fontSize: "11px" }}
        >
          {user._id === message.sender ? (
            <FontAwesomeIcon icon={message.isSeen ? faCheckDouble : faCheck} />
          ) : (
            ""
          )}
          <div className=" ms-1 ">
            {new Date(message.createdAt).getHours()}:
            {new Date(message.createdAt).getMinutes()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
