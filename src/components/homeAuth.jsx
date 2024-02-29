import { useSelector } from "react-redux";

const AutHome = () => {
  const user = useSelector((s) => s.user);

  return (
    <div>
      <div>{user.name}</div>
      <div>{user.image}</div>
      <div>{user.email}</div>
      <div>{user.id}</div>
      <div>{user.token}</div>
    </div>
  );
};
export default AutHome