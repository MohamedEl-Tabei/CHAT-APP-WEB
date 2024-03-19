import { Navbar, Container, Dropdown, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../base/actions";
import Components from "../base/components";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  const user = useSelector((s) => s.user);
  let [searchFor, setSearchFor] = useState("Search chat");
  const refDropdown = useRef();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(Actions.user.logout());
  };
  const onSelectDropdownItem = (event) => {
    event.preventDefault();
    if (event.currentTarget.name === "New Chat")
      setSearchFor("Search new chat");
    else if (event.currentTarget.name === "Chat Request")
      setSearchFor("Search request");
  };
  const onClickBack = () => {
    setSearchFor("Search chat");
  };
  useEffect(() => {
    dispatch(Actions.user.setSearchFor(searchFor));
  }, [dispatch, searchFor]);
  return (
    <Navbar className="bg-darkblue  border-bottom shadow" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>
          {searchFor === "Search chat" ? (
            <img
              src={user.image}
              width="50"
              height="50"
              className="d-inline-block align-top rounded-circle border border-light border-3"
              alt="Profile"
            />
          ) : (
            <div
              style={{ height: 50, width: 50 }}
              className="d-flex justify-content-center align-items-center"
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
              {["New Chat", "Chat Request"].map((v) => (
                <Dropdown.Item
                  key={v}
                  name={v}
                  className="text-center dropdown-item-gray py-2"
                  onClick={(e) => onSelectDropdownItem(e)}
                >
                  {v}
                </Dropdown.Item>
              ))}
              <Dropdown.Item
                className="text-danger dropdown-item-gray text-center py-2"
                onClick={onLogout}
              >
                Log out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Nav.Link
            onClick={() => refDropdown.current.click()}
            style={{ rotate: "90deg" }}
          >
            •••
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
export default NavBar;
