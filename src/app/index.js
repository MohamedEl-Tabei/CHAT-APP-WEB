import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pages from "../base/pages";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Pages.NotFound/>}/>
        <Route path="/" element={<Pages.Home/>}/>
        <Route path="/resetPassword/:token" element={<Pages.ResetPassword/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
