import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import Actions from "../base/actions";
import Components from "../base/components";
import REQUEST from "../api";
const FormSignup = ({ setHasAccount }) => {
  /*
    step 1 send code to user
    step 2 user verify email by enter code
    then email is valid
    step 3 sign up
    */

  let [step, setStep] = useState(1);
  let [email, setEmail] = useState("");
  let [code, setCode] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");
  let [showPass, setShowPass] = useState(false);
  let [hasError, setHasError] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setHasError(error.length);
  }, [error]);
  //Validator
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

  //Handlers
  const onSendCodeToUser = async () => {
    try {
      setStep(1.5);
      await REQUEST.CHATAPP_API.post("/verifyEmail/sendCode", { email });
      await setStep(2);
      await setError("");
    } catch (error) {
      setError(error.response.data.toLowerCase().replace(email.toLocaleLowerCase(),"This email"));
      setStep(1);
    }
  };
  const onVerifyCode = async () => {
    setStep(2.5);
    let response = await REQUEST.CHATAPP_API.post("/verifyEmail/verifyCode", {
      code,
      email,
    });
    if (await response.data) {
      await setStep(3);
      await setError("");
    } else {
      setError("Invalid code.");
      setStep(1);
      setCode("");
    }
  };
  const onSignup = () => {
      dispatch(Actions.user.signup({ email, password }));
      setStep(3.5)
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    switch (step) {
      case 1:
        onSendCodeToUser();
        break;
      case 2:
        onVerifyCode();
        break;
      case 3:
        onSignup();
        break;
      default:
        break;
    }
  };
  const onChangeHandler = (event) => {
    let value = event.currentTarget.value;
    switch (step) {
      case 1:
        setEmail(value);
        setError(
          !/^[a-zA-Z]+[A-Za-z0-9.]+@+[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(value)
            ? "Invalid email address."
            : ""
        );
        break;
      case 2:
        setCode(value);
        setError("");
        break;
      case 3:
        setPassword(value);
        setError(passwordValidator(value));
        break;
      default:
        break;
    }
  };
  if (step === 1.5) return <Components.SendingEmail email={email} send="code" />;
  if (step === 2.5) return <Components.Verifying />;
  if (step === 3.5) return <Components.PleaseWait />;
  return (
    <Form
      className="d-flex flex-column  align-items-center justify-content-center jcs-mobile  w-100  h-100 pt-3 pb-5 py-md-5  switch"
      onSubmit={(e) => onSubmitHandler(e)}
    >
      <h1 className="mb-5 text-darkblue fw-normal">Sign up</h1>
      {["Email", "Code", "Password"].map((v, i) => {
        return (
          <Form.Group
            className={`mb-3 w-75 w-98-mobile p-3 switch position-relative ${
              step === i + 1 ? "" : "d-none"
            }`}
            key={i}
          >
            <Form.Label className="d-flex justify-content-between ">
              <div className={`${hasError ? "text-danger" : ""}`}>
                {hasError ? error : v}
              </div>
            </Form.Label>
            <Form.Control
              className="rounded-0 "
              type={v === "Password" && !showPass ? "password" : "text"}
              placeholder={v === "Email" ? "user@example.com" :v==="Password"?"••••••••": ""}
              onChange={(e) => onChangeHandler(e)}
              isInvalid={hasError}
              value={v === "Email" ? email : v === "Code" ? code : password}
            />

            <div
              className={`position-absolute   text-darkblue  align-items-center justify-content-end p-1 rounded-circle ${
                v !== "Password" ? "d-none" : "d-flex"
              }`}
              style={{
                bottom: 25,
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
      <div className="d-flex justify-content-center w-75 w-98-mobile px-3">
        <Button
          className=" w-100 btn-darkblue rounded-0"
          style={{ width: 150 }}
          type="submit"
          disabled={
            (step === 1 && !email.length) ||
            (step === 2 && !code.length) ||
            (step === 3 && !password.length) ||
            (hasError && error !== "Invalid code.")
          }
        >
          {step === 3 ? "Sign up" : "Continue"}
        </Button>
      </div>
      <Form.Text
        className={`text-muted ${
          step !== 1 ? "d-none" : "d-flex"
        } `}
      >
        Already have an account?
        <span
          className="text-darkblue fw-bold ms-1 pointer"
          onClick={() => setHasAccount(true)}
        >
          Log in
        </span>
      </Form.Text>
    </Form>
  );
};
export default FormSignup;
