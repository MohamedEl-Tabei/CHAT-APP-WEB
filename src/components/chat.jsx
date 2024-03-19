import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import variables from "../base/variables";
import { Form, Navbar, Button, Container, CloseButton } from "react-bootstrap";
import { io } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Actions from "../base/actions";
const Chat = () => {
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState();
  const [mounted, setMounted] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const onCloseChat = () => {
    dispatch(Actions.user.setConnectWith(""));
  };
  useEffect(() => {
    if (mounted) {
      const newSocket = io(variables.baseUrl, { autoConnect: false });
      setSocket(newSocket);
    } else setMounted(true);
  }, [mounted]);
  useEffect(() => {
    if (mounted && socket) {
      socket.connect();
      socket.emit("addToOnlineUsers", user._id);
      socket.on("isOnline", (friendId) => {
        if (friendId === user.connectWith._id) setIsOnline(true);
      });
      socket.on("isOffline", (friendId) => {
        if (friendId === user.connectWith._id) setIsOnline(false);
      });
    }
  }, [socket, user._id, user.connectWith, mounted]);
  useEffect(() => {
    if (user.connectWith) {
      setIsOnline(user.connectWith.socketId.length);
    }
  }, [user.connectWith]);
  if (user.connectWith)
    return (
      <div className="w-100 h-100 d-flex flex-column justify-content-between bg-gray ">
        <Navbar className="bg-light shadow">
          <Container>
            <Navbar.Brand className="position-relative  d-flex align-items-center w-100">
              <img
                src={user.image}
                width="50"
                height="50"
                className="d-inline-block align-top rounded-circle border border-light border-3 me-2"
                alt="Profile"
              />
              <span>{user.connectWith.name}</span>
              <div
                className={`isonline bg-${isOnline ? "success" : "secondary"}`}
              />
              <CloseButton onClick={onCloseChat} className="ms-auto" />
            </Navbar.Brand>
          </Container>
        </Navbar>
        <div className="w-100 h-75 position-relative">
          <div
            style={{ opacity: 0.1 }}
            className="position-absolute h-100 w-100 d-flex justify-content-center align-items-center"
          >
            <img
              src={variables.loogo}
              width="350"
              className="d-inline-block align-top  "
              alt="Profile"
            />
          </div>
        </div>
        <Navbar className="bg-light justify-content-between p-3 px-4">
          <Form className="d-flex justify-content-between w-100">
            <Form.Control
              type="search"
              placeholder="Message"
              className="me-2 rounded-0 "
              aria-label="Search"
              size="lg"
              style={{ width: "95%" }}
            />
            <Button
              className="btn-darkblue rounded-circle p-0 ms-0 d-flex justify-content-center align-items-center"
              style={{ width: 50, height: 50 }}
              size="lg"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </Form>
        </Navbar>
      </div>
    );
  else
    return (
      <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center  bg-gray ">
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
