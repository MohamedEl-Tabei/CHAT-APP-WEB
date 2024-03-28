import { useSelector } from "react-redux";

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
        style={{maxWidth:"100%"}}
        
      >
        <p className="p-1 pe-5 m-0" style={{ fontSize: "14px" }}>{message.text}</p>
        <div style={{ fontSize: "11px" }}>
          <div className="ms-auto wmc ">
            {new Date(message.createdAt).getHours()}:
            {new Date(message.createdAt).getMinutes()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
