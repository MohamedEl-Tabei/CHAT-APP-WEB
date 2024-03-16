import { Form, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../base/actions";
import { useEffect, useState } from "react";
//Search For
//1-Search chat
//2-Search new chat
//3-Search request
const Search = ({ searchFor }) => {
  const user = useSelector((s) => s.user);
  let [str, setSTR] = useState("");
  let [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onSubmit = (event) => {
    event.preventDefault();
    if (str.length) {
      setLoading(true);
      dispatch(
        Actions.user.search({
          keyword: str,
          for: searchFor,
          token: user.token,
        })
      );
    }
  };

  const onchange = (event) => {
    const value = event.currentTarget.value.toLowerCase();
    if (value.length === 0) {
      dispatch(Actions.user.setSearchArrayEmpty());
    }
    setSTR(value);
  };
  useEffect(() => {
    setSTR("");
    dispatch(Actions.user.setSearchArrayEmpty());
  }, [searchFor, dispatch]);
  useEffect(() => {
    setLoading(false);
  }, [user.searchArray]);
  return (
    <Form
      className="d-flex  w-100 mx-3  position-relative  bg-light rounded-5"
      data-bs-theme="light"
      onSubmit={(e) => onSubmit(e)}
    >
      <Form.Control
        type="text"
        placeholder={searchFor}
        className="  p-2 px-3 rounded-5"
        aria-label={searchFor}
        size="sm"
        onChange={(e) => onchange(e)}
        value={str}
        readOnly={loading}
      />
      {loading ? (
        <Spinner
          className="position-absolute"
          style={{ top: 10, right: 16, color: "#999daf" }}
          size="sm"
        />
      ) : (
        <FontAwesomeIcon
          className="position-absolute"
          style={{ top: 10, right: 16, color: "#999daf" }}
          icon={str.length ? faXmark : faMagnifyingGlass}
          onClick={() => {
            dispatch(Actions.user.setSearchArrayEmpty());
            setSTR("");
          }}
        />
      )}
    </Form>
  );
};
export default Search;
