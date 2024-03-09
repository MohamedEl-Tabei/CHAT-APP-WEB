const token = window.location.search.slice(2);
const ResetPassword = () => (
  <div className="w-100 h-100vh bg-success" onClick={() => console.log(token)}>
    {token}
  </div>
);
export default ResetPassword;
