import { useState } from "react";
import AddProd from "./screens/AddProd";
import Login from "./screens/Login";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <div className="container flex flex-col justify-center items-center p-10 min-w-full min-h-screen text-black bg-[#083440]">
      {isAuth ? <AddProd /> : <Login setIsAuth={setIsAuth} />}
    </div>
  );
}

export default App;
