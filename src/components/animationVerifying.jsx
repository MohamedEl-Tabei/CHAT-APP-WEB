import Lottie from "lottie-react";
import data from "../animations/verify.json";
const Verifying = () => {
  return (
   <div className="h-100 d-flex justify-content-center align-items-center">
     <Lottie
      animationData={data}
      className=" py-3  w-200px-mobile m-auto"
      style={{ width: 300 }}
    />
   </div>
  );
};
export default Verifying;
