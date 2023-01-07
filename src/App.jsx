import { useState } from "react";
import AddProd from "./screens/AddProd";
import Login from "./screens/Login";
import PidInput from "./screens/PidInput";

function App() {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("admin_qualido_token")
  );

  console.log(localStorage.getItem("admin_qualido_token"));

  return (
    <div className="container flex flex-col justify-center items-center p-10 min-w-full min-h-screen text-black bg-[#083440]">
      {isAuth ? <PidInput /> : <Login setIsAuth={setIsAuth} />}
    </div>
  );
}

export default App;
