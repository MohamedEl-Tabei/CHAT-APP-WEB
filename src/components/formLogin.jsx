import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../base/actions";
import Components from "../base/components";
import REQUEST from "../api";
const FormLogin = ({ setHasAccount }) => {
  /*
    step 1 Enter Data
    step 2 Send Data
    */
  const user = useSelector((s) => s.user);

  let [step, setStep] = useState(1);
  let [email, setEmail] = useState("salah@gmail.com");
  let [password, setPassword] = useState("Mo123***");
  let [rememberMe, setRememberMe] = useState(false);
  let [showPass, setShowPass] = useState(false);
  let [hasError, setHasError] = useState(false);
  let [forgetPassword, setForgetPassword] = useState(false);
  let [sendResetPasswordLink, setSendResetPasswordLink] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.error !== "Token is expired.") setHasError(user.error.length);
    if (user.error.length) setStep(1);
  }, [user.error]);

  //Handlers

  const onSubmit = async (event) => {
    event.preventDefault();
    if (forgetPassword) {
      setStep(2);
      await REQUEST.CHATAPP_API.post("/user/sendResetPasswordLink", {
        email,
      });
      setSendResetPasswordLink(`Link has been sent to`);
    } else dispatch(Actions.user.login({ email, password, rememberMe }));
    setStep(2);
  };

  const onChangeHandler = (event) => {
    let value = event.currentTarget.value;
    let title = event.currentTarget.title;
    if (title === "Email") setEmail(value);
    else setPassword(value);
    setHasError(false);
    dispatch(Actions.user.setErrorEmpty())
  };
  if (sendResetPasswordLink === `Link has been sent to`)
    return (
      <h1 className="d-flex h-100 fw-normal justify-content-center align-items-center flex-column switch">
        <img
          src="https://i.ibb.co/XyXD0Hb/image-30.png"
          style={{ width: 100 }}
          className="mb-2"
          alt="email"
        />
        {sendResetPasswordLink}

        <h5 className="mt-4 text-darkblue fw-normal">{email}</h5>
      </h1>
    );
  if (step === 2 && forgetPassword)
    return <Components.SendingEmail email={email} send={"link"} />;

  if (step === 2) return <Components.PleaseWait />;
  return (
    <Form
      className="d-flex flex-column  align-items-center justify-content-center jcs-mobile  w-100  h-100 pt-3 pb-5 py-md-5  switch position-relative"
      onSubmit={(e) => onSubmit(e)}
    >
      <div
        className={`${
          forgetPassword
            ? "pointer position-absolute top--170-mobile"
            : "d-none"
        }`}
        onClick={() => setForgetPassword(false)}
        style={{ top: 20, left: 20 }}
      >
        <FontAwesomeIcon icon={faAngleLeft} className="me-2" />
        Back
      </div>
      <h1 className="mb-5 text-darkblue fw-normal">
        {forgetPassword ? "Rest Password" : "Login"}
      </h1>
      {["Email", "Password"].map((v, i) => {
        return (
          <Form.Group
            className={` w-75 w-98-mobile p-3 pb-2 switch position-relative ${
              forgetPassword && v === "Password" ? "d-none" : ""
            }`}
            key={i}
          >
            <Form.Label className="d-flex justify-content-between ">
              <div className={`${hasError ? "text-danger" : ""}`}>{v}</div>
            </Form.Label>
            <Form.Control
              title={v}
              className="rounded-0 "
              type={v === "Password" && !showPass ? "password" : "text"}
              placeholder={v === "Email" ? "user@example.com" : "••••••••"}
              onChange={(e) => onChangeHandler(e)}
              isInvalid={hasError}
              value={v === "Email" ? email : password}
            />

            <div
              className={`position-absolute   text-darkblue  align-items-center justify-content-end p-1 rounded-circle ${
                v !== "Password" ? "d-none" : "d-flex"
              }`}
              style={{
                bottom: 15,
                right: 26,
                backgroundColor: "white",
              }}
            >
              <FontAwesomeIcon
                icon={showPass ? faEye : faEyeSlash}
                onClick={() => setShowPass(!showPass)}
                className={`${hasError ? "text-danger" : ""}`}
              />
            </div>
          </Form.Group>
        );
      })}
      <div
        className={`${
          forgetPassword ? "d-none" : "d-flex"
        }  w-75 w-98-mobile px-3 my-3`}
      >
        <Form.Check
          type="checkbox"
          label="Stay logged in"
          id="Stay logged in"
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
          className="rounded-0"
        />
      </div>
      <div className={`${hasError ? "text-danger visible" : "invisible"}`}>
        {user.error}
      </div>
      <div className="d-flex justify-content-center w-75 w-98-mobile px-3 mt-3">
        <Button
          className=" w-100 btn-darkblue rounded-0"
          style={{ width: 150 }}
          type="submit"
          disabled={
            !email.length || (!password.length && !forgetPassword) || hasError
          }
        >
          {forgetPassword ? "Send link" : "Login"}
        </Button>
      </div>
      <h6
        className={`${
          forgetPassword ? "d-none" : "d-flex"
        } text-center py-3 m-0 pointer fw-normal`}
        onClick={() => setForgetPassword(true)}
      >
        I forgot my password
      </h6>
      <Form.Text
        className={`text-muted ${
          step !== 1 || forgetPassword ? "d-none" : "d-flex"
        } `}
      >
        Don’t you have an account?
        <span
          className="text-darkblue fw-bold ms-1 pointer"
          onClick={() => setHasAccount(false)}
        >
          Sign up
        </span>
      </Form.Text>
    </Form>
  );
};
export default FormLogin;
