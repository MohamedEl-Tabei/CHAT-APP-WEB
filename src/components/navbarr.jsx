import { Navbar, Container, Dropdown, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../base/actions";
import { useRef } from "react";

function NavBar() {
  const user = useSelector((s) => s.user);
  const refDropdown = useRef();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(Actions.user.logout());
  };
  return (
    <Navbar className="bg-darkblue border-end" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={user.image}
            width="50"
            height="50"
            className="d-inline-block align-top rounded-circle"
            alt="Profile"
          />
        </Navbar.Brand>
        <Nav>
          <Dropdown drop="start" data-bs-theme="light">
            <Dropdown.Toggle className="d-none" ref={refDropdown} />
            <Dropdown.Menu
              className="rounded-0 switch p-0"
              style={{ top: 10, right: -10 }}
            >
              {["New Chat", "Chat Request"].map((v) => (
                <Dropdown.Item
                  key={v}
                  className="text-center dropdown-item-lightblue py-2"
                >
                  {v}
                </Dropdown.Item>
              ))}
              <Dropdown.Divider className="m-0" />
              <Dropdown.Item
                className="text-danger dropdown-item-lightblue text-center py-2"
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
