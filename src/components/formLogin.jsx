import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../base/actions";
import Components from "../base/components";
const FormLogin = ({ setHasAccount }) => {
  /*
    step 1 Enter Data
    step 2 Send Data
    */
  const user = useSelector((s) => s.user);

  let [step, setStep] = useState(1);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [rememberMe, setRememberMe] = useState(false);
  let [showPass, setShowPass] = useState(true);
  let [hasError, setHasError] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setHasError(user.error.length);
    if (user.error.length) setStep(1);
  }, [user.error]);

  //Handlers

  const onLogin = (event) => {
    event.preventDefault();
    dispatch(Actions.user.login({ email, password,rememberMe }));
    console.log(rememberMe)
    setStep(2);
  };

  const onChangeHandler = (event) => {
    let value = event.currentTarget.value;
    let title = event.currentTarget.title;
    if (title === "Email") setEmail(value);
    else setPassword(value);
    setHasError(false)
  };
  if (step === 2) return <Components.PleaseWait />;
  return (
    <Form
      className="d-flex flex-column  align-items-center justify-content-center jcs-mobile  w-100  h-100 pt-3 pb-5 py-md-5  switch"
      onSubmit={(e) => onLogin(e)}
    >
      <h1 className="mb-5 text-darkblue">Login</h1>
      {["Email", "Password"].map((v, i) => {
        return (
          <Form.Group
            className={` w-75 w-98-mobile p-3 pb-2 switch position-relative`}
            key={i}
          >
            <Form.Label className="d-flex justify-content-between ">
              <div className={`${hasError ? "text-danger" : ""}`}>{v}</div>
            </Form.Label>
            <Form.Control
              title={v}
              className="rounded-0 "
              type={v === "Password" && !showPass ? "password" : "text"}
              placeholder={v === "Email" ? "user@example.com" : ""}
              onChange={(e) => onChangeHandler(e)}
              isInvalid={hasError}
              value={v === "Email" ? email : password}
            />

            <div
              className={`position-absolute   text-darkblue  align-items-center justify-content-end py-1 ${
                v !== "Password" ? "d-none" : "d-flex"
              }`}
              style={{
                bottom: 15,
                right: 26,
                width: 60,
                backgroundColor: "inherit",
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
      <div className="d-flex  w-75 w-98-mobile px-3 my-3">
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
          disabled={!email.length || !password.length || hasError}
        >
          Login
        </Button>
      </div>

      <Form.Text className={`text-muted ${step !== 1 ? "d-none" : "d-flex"} `}>
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
