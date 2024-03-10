import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import logo from "../base/logo";
const token = window.location.pathname.replace("/resetPassword/", "");
const ResetPassword = () => {
  let [show, setShow] = useState(false);
  let [error, setError] = useState("");
  const passwordValidator = (password) => {
    if (password.length === 0) return "Password is required.";
    else if (password.length < 8)
      return "Password is too short. The minimum length is 8 characters.";
    else if (password.length > 26)
      return "Password is too long. The maximum length is 26 characters.";
    else if (!/[0-9]/.test(password))
      return "Password must contain numbers 0-9.";
    else if (!/[a-z]/.test(password))
      return "Password must contain lowercase letters a-z.";
    else if (!/[A-Z]/.test(password))
      return "Password must contain uppercase letters A-Z.";
    else if (!/[!@#$%^&*]/.test(password))
      return "Password must contain special characters [!@#$%^&*].";
    else return "";
  };

  return (
    <div
      className="w-100 h-100vh position-relative"
      style={{
        backgroundImage:
          "url(https://i.ibb.co/HCCn4hP/abstract-technology-secure-background-23-2148357086.jpg)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      onClick={() => console.log(token)}
    >
      <div
        className="position-absolute bg-dark h-100 w-100 d-flex flex-column justify-content-center align-items-center"
        style={{ opacity: 0.95 }}
      >
        <Form
          className="w-50 w-98-mobile  h-100-mobile w-100-mobile p-4 p-sm-5 rounded-5 d-flex flex-column justify-content-around  align-items-center"
          style={{ backgroundColor: "#f8f9fa30" }}
        >
          <img className="mb-4" style={{ width: 250 }} src={logo} />

          <Form.Group
            className="mx-5 mb-3 w-100 position-relative text-light"
            controlId="formBasicPassword"
          >
            <div
              className="bg-darkblue pointer text-light rounded-circle d-flex  justify-content-around align-items-center"
              style={{
                width: 35,
                height: 35,
                position: "absolute",
                top: 38,
                right: 15,
              }}
              onClick={() => setShow(!show)}
            >
              <FontAwesomeIcon icon={show ? faEye : faEyeSlash} />
            </div>
            <Form.Label>New Password</Form.Label>
            {["Password", "Confirm password"].map((v) => {
              return (
                <Form.Control
                  className="mb-3"
                  type={show ? "text" : "password"}
                  size="lg"
                  placeholder={v}
                />
              );
            })}
          </Form.Group>

          <Button className="btn-darkblue mt-4 w-100 mx-5" size="lg">
            Reset password
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default ResetPassword;
