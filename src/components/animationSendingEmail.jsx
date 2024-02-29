import Lottie from "lottie-react";
import data from "../animations/sendEmail.json";
const SendingEmail = ({ email }) => {
  return (
    <div className="h-100 text-center d-flex flex-column justify-content-center align-items-center pb-5 ">
      <Lottie
        animationData={data}
        className=" py-3  w-200px-mobile m-auto"
        style={{ width: 300 }}
      />
      <h3 className="fw-normal">Sending code to</h3>
      <h4 className="fw-light">{email}</h4>
    </div>
  );
};
export default SendingEmail;
