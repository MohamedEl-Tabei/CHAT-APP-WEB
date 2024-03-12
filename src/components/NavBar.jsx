import { Navbar ,Container, Button} from "react-bootstrap";
import { useDispatch } from "react-redux";
import Actions from "../base/actions";

function NavBar() {
  const dispatch=useDispatch()
  const onLogout=()=>{
    dispatch(Actions.user.logout())
  }
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src="/img/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Button onClick={onLogout}>Log out</Button>
      </Container>
    </Navbar>
  );
}
export default NavBar