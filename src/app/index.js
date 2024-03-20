import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pages from "../base/pages";
import { io } from "socket.io-client";
import { createContext } from "react";
import variables from "../base/variables";
const socket = io(variables.baseUrl,{autoConnect:false});
export const SocketIO = createContext();
function App() {
  return (
    <SocketIO.Provider value={socket}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Pages.NotFound />} />
          <Route path="/" element={<Pages.Home />} />
          <Route
            path="/resetPassword/:token"
            element={<Pages.ResetPassword />}
          />
        </Routes>
      </BrowserRouter>
    </SocketIO.Provider>
  );
}

export default App;
