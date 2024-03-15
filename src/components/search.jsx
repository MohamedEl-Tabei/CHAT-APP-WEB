import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../base/actions";
//Search For
//1-Search chat
//2-Search new chat
//3-Search request
const Search = ({ searchFor }) => {
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const onchange = (event) => {
    const value = event.currentTarget.value;
    dispatch(
      Actions.user.search({ keyword: value, for: searchFor, token: user.token })
    );
  };

  return (
    <Form
      className="d-flex  w-100 mx-3  position-relative p-1 bg-light rounded-5"
      data-bs-theme="light"
      onSubmit={(e) => e.preventDefault()}
    >
      <Form.Control
        type="search"
        placeholder={searchFor}
        className="  p-2 px-3 rounded-5"
        aria-label={searchFor}
        size="sm"
        onChange={(e) => onchange(e)}
      />
      <FontAwesomeIcon
        className="position-absolute"
        style={{ top: 15, right: 20, color: "#999daf" }}
        icon={faMagnifyingGlass}
      />
    </Form>
  );
};
export default Search;
