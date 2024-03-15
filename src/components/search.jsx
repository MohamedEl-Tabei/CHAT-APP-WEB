import { Form, Navbar } from "react-bootstrap";
const Search = () => {
  return (
    <Navbar expand="lg" className=" p-0 border-bottom border-light p-2">
      <Form className="d-flex  w-100">
        <Form.Control
          type="search"
          placeholder="Search"
          className="m-2  p-2 px-3 rounded-5"
          aria-label="Search"
        />
      </Form>
    </Navbar>
  );
};
export default Search;
