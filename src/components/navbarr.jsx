import { Navbar, Container, Dropdown, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../base/actions";
import Components from "../base/components";
import { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { SocketIO } from "../app";
function NavBar() {
  const socket = useContext(SocketIO);
  const user = useSelector((s) => s.user);
  let [searchFor, setSearchFor] = useState("Search chat");
  const refDropdown = useRef();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(Actions.user.logout());
    socket.disconnect();
  };
  const onSelectDropdownItem = (event) => {
    event.preventDefault();
    if (event.currentTarget.name === "New Chat")
      setSearchFor("Search new chat");
    else if (event.currentTarget.name === "Chat Request") {
      setSearchFor("Search request");
      dispatch(Actions.user.deleteNotificationsRequest());
    } else if (event.currentTarget.name === "Messages")
      setSearchFor("Search chat");
  };
  const onClickBack = () => {
    setSearchFor("Search chat");
  };
  useEffect(() => {
    dispatch(Actions.user.setSearchFor(searchFor));
  }, [dispatch, searchFor]);
  useEffect(() => {
    socket.on("requestNotification", (id) => {
      if (user.searchFor === "Search request")
        dispatch(Actions.user.deleteNotificationsRequest());
      else dispatch(Actions.user.pushNotificationsRequest(id));
    });
    socket.on("receiveMessage", (newMessage, senderId) => {
      if (user.searchFor !== "Search chat") {
        dispatch(Actions.user.sethNotificationsMessage(user.token));
      }
    });
  }, [socket, dispatch, user.searchFor,user.token]);
  return (
    <Navbar className="bg-darkblue  border-bottom shadow" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>
          {searchFor === "Search chat" ? (
            <img
              src={"https://i.ibb.co/0RdPPt8v/296fe121-5dfa-43f4-98b5-db50019738a7.jpg"||user.image}
              width="50"
              height="50"
              className="d-inline-block align-top rounded-circle border border-light border-3 switch"
              alt="Profile"
            />
          ) : (
            <div
              style={{ height: 50, width: 50 }}
              className="d-flex justify-content-center align-items-center switch"
            >
              <FontAwesomeIcon
                onClick={onClickBack}
                icon={faArrowLeftLong}
                className="pointer"
              />
            </div>
          )}
        </Navbar.Brand>
        <Components.Search searchFor={searchFor} />
        <Nav>
          <Dropdown drop="start" data-bs-theme="light">
            <Dropdown.Toggle className="d-none" ref={refDropdown} />
            <Dropdown.Menu
              className="rounded-0 switch p-0 border-0 shadow"
              style={{ top: 10, right: -10 }}
            >
              {["Messages", "New Chat", "Chat Request"].map((v) => (
                <Dropdown.Item
                  key={v}
                  name={v}
                  className={`text-center dropdown-item-gray py-2 d-${
                    (user.searchFor === "Search chat" && v === "Messages") ||
                    (user.searchFor === "Search new chat" &&
                      v === "New Chat") ||
                    (user.searchFor === "Search request" &&
                      v === "Chat Request")
                      ? "none"
                      : "flex"
                  } justify-content-center align-items-center`}
                  onClick={(e) => onSelectDropdownItem(e)}
                >
                  {v}

                  <span
                    style={{
                      opacity:
                        v === "Chat Request" &&
                        user.requestNotifications.length &&
                        user.searchFor !== "Search request"
                          ? 1
                          : 0,
                    }}
                    className=" text-danger fs-4 ms-1 d-flex justify-content-center"
                  >
                    •
                  </span>
                </Dropdown.Item>
              ))}
              <Dropdown.Item
                className="text-danger dropdown-item-gray text-center py-2 d-flex justify-content-center align-items-center"
                onClick={onLogout}
              >
                Log out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Nav.Link
            onClick={() => refDropdown.current.click()}
            style={{ rotate: "90deg", position: "relative" }}
          >
            <div
              style={{
                top: 0,
                opacity: user.requestNotifications.length ? 1 : 0,
              }}
              className="position-absolute text-danger"
            >
              •
            </div>
            •••
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
export default NavBar;
