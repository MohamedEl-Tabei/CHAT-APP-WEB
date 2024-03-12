import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import logo from "../base/logo";
import REQUEST from "../api";
import Components from "../base/components";
const token = window.location.pathname.replace("/resetPassword/", "");
const ResetPassword = () => {
  let [checkToken, setCheckToken] = useState(false);
  let [show, setShow] = useState(false);
  let [success,setSuccess]=useState(false)
  let [error, setError] = useState("");
  let [password, setPassword] = useState("");
  let [passwordConfirm, setPasswordConfirm] = useState("");
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
  useEffect(() => {
    (async () => {
      try {
        await REQUEST.CHATAPP_API.get("/user/validToken", {
          headers: { "x-auth-token": token },
        });
      } catch (error) {
        setError(error.response.data);
      }
      setCheckToken(true);
    })();
  }, []);
  const onChangeHandler = (e) => {
    if (e.currentTarget.placeholder === "Password") {
      setPassword(e.currentTarget.value);
      setError(
        e.currentTarget.value !== passwordConfirm && passwordConfirm.length
          ? "Password & Confirm Password must have same value."
          : passwordValidator(e.currentTarget.value)
      );
    } else {
      setPasswordConfirm(e.currentTarget.value);
      setError(
        e.currentTarget.value !== password
          ? "Password & Confirm Password must have same value."
          : passwordValidator(password)
      );
    }
  };
  const onsubmitHndler = async (e) => {
    e.preventDefault();
    try {
      setCheckToken(false)
      await REQUEST.CHATAPP_API.put(
        "user/resetPassword",
        { password },
        { headers: { "x-auth-token": token } }
      );
      setSuccess(true)
      setCheckToken(true)
    } catch (error) {
      setError(error.response.data);
      setCheckToken(true)
    }
  };
  if (success) {
    return (
      <h1 className="h-100vh d-flex justify-content-center align-items-center text-success m-0">
        Password has been changed successfully 
      </h1>
    );
  }
  if (!checkToken)
    return (
      <div className="h-100vh">
        <Components.PleaseWait />
      </div>
    );
  if (error === "jwt expired") {
    return (
      <h1 className="h-100vh d-flex justify-content-center align-items-center text-danger m-0">
        Link Expired
      </h1>
    );
  }
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
        className="position-absolute bg-light h-100 w-100 d-flex flex-column justify-content-center align-items-center"
        style={{ opacity: 0.95 }}
      >
        <Form
          className="w-50 w-98-mobile  h-100-mobile w-100-mobile p-4 p-sm-5 rounded-5 d-flex flex-column justify-content-around  align-items-center"
          style={{ backgroundColor: "#f8f9fa30" }}
          onSubmit={(event) => onsubmitHndler(event)}
        >
          <img
            className="mb-4 bg-darkblue p-2"
            alt="logo"
            style={{ width: 250 }}
            src={logo}
          />

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
            <Form.Label>
              {error.length ? (
                <span className="text-danger">
                  {error.replace("jwt", "Link")}
                </span>
              ) : (
                "New Password"
              )}
            </Form.Label>
            {["Password", "Confirm password"].map((v, k) => {
              return (
                <Form.Control
                  key={k}
                  className="mb-3"
                  type={show ? "text" : "password"}
                  size="lg"
                  placeholder={v}
                  onChange={(event) => onChangeHandler(event)}
                  disabled={
                    ((error.length &&
                      error !==
                        "Password & Confirm Password must have same value.") ||
                      !password.length) &&
                    v === "Confirm password"
                  }
                />
              );
            })}
          </Form.Group>

          <Button
            className="btn-darkblue mt-4 w-100 mx-5"
            size="lg"
            type="submit"
            disabled={
              error.length || password !== passwordConfirm || !password.length
            }
          >
            Reset password
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default ResetPassword;
