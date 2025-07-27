import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import variables from "../base/variables";
import { Form, Navbar, Button, Container, CloseButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImage,
  faPaperPlane,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faFaceGrinWide } from "@fortawesome/free-regular-svg-icons";
import Actions from "../base/actions";
import { SocketIO } from "../app";
import REQUEST from "../api";
import Components from "../base/components";

const Chat = () => {
  const user = useSelector((s) => s.user);
  const refMessageInput = useRef(null);
  const refChatBody=useRef(null);
  const dispatch = useDispatch();
  const [isOnline, setIsOnline] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [mounted, setMounted] = useState(false);
  const socket = useContext(SocketIO);
  const [scanner, setScanner] = useState(true);
  const [dates, setDates] = useState([]);
  const [emoji, setEmoji] = useState(false);
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  const onCloseChat = () => {
    dispatch(Actions.user.setConnectWith({ ...user.connectWith, _id: "" }));
  };

  useEffect(() => {
    if (socket) {
      socket.connect();
      socket.emit("addToOnlineUsers", user._id);
      socket.on("isOnline", (friendId) => {
        if (friendId === user.connectWith._id) setIsOnline(true);
      });
      socket.on("isOffline", (friendId) => {
        if (friendId === user.connectWith._id) setIsOnline(false);
      });
    }
  }, [socket, user._id, user.connectWith]);
  useEffect(() => {
    if (user.connectWith._id.length && !mounted) {
      (async () => {
        try {
          let mssgs = await REQUEST.CHATAPP_API.post(
            "message/getMessages",
            { id: user.connectWith._id },
            { headers: { "x-auth-token": user.token } }
          );
          setMessages([...messages, ...(await mssgs.data)]);
          let arr = [];
          await mssgs.data.forEach((mssg) => {
            let dt = new Date(mssg.createdAt);
            if (!arr.includes(dt.toDateString())) arr.push(dt.toDateString());
          });
          setDates([...arr]);
          setMounted(true);
          setScanner(false);
        } catch (error) {
          console.log(error);
        }
      })();
      setIsOnline(user.connectWith.socketId.length);
    }
  }, [user.connectWith, user.token, messages, mounted]);
  useEffect(() => {
    setMounted(false);
    setMessages([]);
    setScanner(true);
    refMessageInput.current?.focus();
  }, [user.connectWith]);
  useEffect(() => {
    socket.on("receiveMessage", (newMessage, senderId) => {
      if (senderId === user.connectWith._id) {
        let arr = [...messages];
        arr.push(newMessage);
        setMessages(arr);
      }
    });
  }, [socket, messages, user.connectWith._id, user._id]);
  useEffect(() => {
    socket.on("getMessage", (newMessage) => {
      let arr = [...messages];
      arr.push(newMessage);
      setMessages(arr);
    });
  }, [messages, socket]);
  useEffect(() => {
    socket.on("yourMessageSeen", (allMessages) => {
      setMessages(allMessages);
    });
  }, [socket]);
  useEffect(() => {
    if (user.connectWith._id && messages.find((m) => !m.isSeen))
      socket.emit("seeMessage", user.connectWith._id, user._id);
  }, [messages, socket, user.connectWith._id, user._id]);
  useEffect(() => {
    if (emoji) refMessageInput.current?.focus();
  }, [emoji]);
  useEffect(()=>{
    refChatBody.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
  },[messages])
  const onSendMessage = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", user.connectWith._id, user._id, message);
    setMessage("");
  };

  if (user.connectWith._id)
    return (
      <div className="w-100 h-100 d-flex flex-column justify-content-between bg-gray switch ">
        <Navbar className="bg-light shadow border-bottom">
          <Container>
            <Navbar.Brand className="position-relative  d-flex align-items-center w-100">
              <img
              src={"https://i.ibb.co/0RdPPt8v/296fe121-5dfa-43f4-98b5-db50019738a7.jpg"}
                // src={user.connectWith.image}
                width="50"
                height="50"
                className="d-inline-block align-top rounded-circle border border-light border-3 me-2"
                alt="Profile"
              />
              <span>{user.connectWith.name}</span>
              <div
                className={`isonline `}
                style={{ backgroundColor: isOnline ? "#04f600" : "gray" }}
              />
              <CloseButton onClick={onCloseChat} className="ms-auto" />
            </Navbar.Brand>
          </Container>
        </Navbar>
        <div className="w-100 h-100 position-relative">
          <div
            style={{ opacity: messages.length ? 0 : 0.1 }}
            className="position-absolute h-100 w-100 d-flex justify-content-center align-items-center"
          >
            <img
              src={variables.loogo}
              width="350"
              className="d-inline-block align-top  "
              alt="Profile"
            />
          </div>
          <div  className="position-absolute h-100 w-100 overflow-y-scroll p-3">
            {scanner ? (
              <Components.Scanner />
            ) : (
              dates.map((d, k) => {
                return (
                  <div className="my-2" key={k}>
                    <div
                      className="text-center d-flex justify-content-center "
                      style={{ fontSize: "11px" }}
                    >
                      <div className=" p-3 rounded-3 wmc bg-light">{d}</div>
                    </div>
                    {messages.map((mssg, i) => {
                      return new Date(mssg.createdAt).toDateString() === d ? (
                        <div key={i} >
                          <Components.Message message={mssg} />
                        </div>
                      ) : (
                        ""
                      );
                    })}
                  </div>
                );
              })
            )}
            <div ref={refChatBody}/>
          </div>
        </div>
        <Components.Emoji
          emoji={emoji}
          message={message}
          setMessage={setMessage}
          selectionStart={selectionStart}
          selectionEnd={selectionEnd}
          refMessageInput={refMessageInput}
        />

        <Navbar className="bg-light justify-content-between p-3 border-top">
          <Form
            className="d-flex justify-content-between w-100 position-relative"
            onSubmit={(e) => onSendMessage(e)}
          >
            <Form.Control
              ref={refMessageInput}
              value={message}
              type="text"
              placeholder="Message"
              className="rounded-0"
              aria-label="Search"
              size="lg"
              style={{ paddingLeft: "45px", paddingRight: 45 }}
              onChange={(e) => setMessage(e.currentTarget.value)}
              onClick={(e) => {
                setSelectionEnd(e.currentTarget.selectionEnd);
                setSelectionStart(e.currentTarget.selectionStart);
              }}
            />
            <Button
              className="text-darkblue rounded-0 p-0 ms-0 d-flex justify-content-center align-items-center h-100 bg-none fs-5 border-0"
              style={{ position: "absolute", right: 18, top: 0 }}
              variant="white"
              type={!message ? "button" : "submit"}
            >
              <FontAwesomeIcon
                size="lg"
                style={{ rotate: !message ? "" : "50deg" }}
                icon={!message ? faFileImage : faPaperPlane}
              />
            </Button>
          </Form>
          <Button
            className=" text-secondary rounded-0 p-0 ms-0 d-flex justify-content-center align-items-center h-100 bg-none fs-5 border-0"
            style={{ position: "absolute", left: 28, top: 0 }}
            variant="outline-secondary"
          >
            <FontAwesomeIcon
              size="lg"
              icon={emoji ? faXmark : faFaceGrinWide}
              onClick={() => setEmoji(!emoji)}
            />
          </Button>
        </Navbar>
      </div>
    );
  else
    return (
      <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center  bg-gray switch">
        <img
          src={variables.loogo}
          alt="CHATAPP"
          style={{ width: 350, opacity: 0.1 }}
        />
        <h4 className="" style={{ textAlign: "justify", opacity: 0.1 }}>
          Simply you can connect with others.
        </h4>
      </div>
    );
};

export default Chat;
