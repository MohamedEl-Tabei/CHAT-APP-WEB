import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Components from "../base/components";
import variables from "../base/variables"
const UnAutHome = () => {
  let [hasAccount, setHasAccount] = useState(false);
  return (
    <Container fluid className="h-100vh">
      <Row className="h-100">
        <Col className="bg-darkblue bg-none-mobile  d-flex justify-content-center align-items-center aie-mobile px-5 ">
          <img
          className="w-200px-mobile bg-darkblue p-2"
            style={{ width: 350 }}
            alt=""
            src={variables.loogo}
          />
        </Col>
        <Col>

          {hasAccount ? (
            <Components.FormLogin setHasAccount={setHasAccount} />
          ) : (
            <Components.FormSignup setHasAccount={setHasAccount} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UnAutHome;
