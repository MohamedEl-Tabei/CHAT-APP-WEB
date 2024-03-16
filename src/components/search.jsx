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
  const preventDispatch = (value) => {
    if (str.length && value.length) {
      if (value.includes(str) && user.searchArray.length === 0) return true;
      if (user.searchArray.length === 1)
        if (user.searchArray[0].name.toLowerCase().includes(value)) return true;
      if (user.searchFor === "Search request" && user.searchArray.length === 2)
        if (
          user.searchArray[0].length === 0 &&
          user.searchArray[1].length === 0 &&
          value.includes(str)
        )
          return true;
    }
    return false;
  };

  const onchange = (event) => {
    const value = event.currentTarget.value.toLowerCase();
    if (!preventDispatch(value)) {
      setLoading(true);
      dispatch(
        Actions.user.search({
          keyword: value,
          for: searchFor,
          token: user.token,
        })
      );
    }
    setSTR(value);
  };
  useEffect(() => {
    setSTR("");
  }, [searchFor]);
  useEffect(() => {
    setLoading(false);
  }, [user.searchArray]);
  return (
    <Form
      className="d-flex  w-100 mx-3  position-relative  bg-light rounded-5"
      data-bs-theme="light"
      onSubmit={(e) => e.preventDefault()}
    >
      <Form.Control
        type="text"
        placeholder={searchFor}
        className="  p-2 px-3 rounded-5"
        aria-label={searchFor}
        size="sm"
        onChange={(e) => onchange(e)}
        value={str}
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
