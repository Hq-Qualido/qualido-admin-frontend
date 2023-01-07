import axios from "axios";
import React, { useState } from "react";

const Login = ({ setIsAuth }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const submitHandler = async () => {
    if (!username || !password) return alert("Please enter details.");
    const data = { username, password };
    setLoading(true);
    const res = await axios
      .post("http://localhost:8000/api/auth/admin", data)
      .catch((e) => setError(true));

    if (res) setLoading(false);

    if (!loading && res.data.code === "AUTH_TRUE") {
      localStorage.setItem("admin_qualido_token", true);
      setIsAuth(true);
    } else setError(true);
  };

  return (
    <div className="flex flex-col justify-center text-cyan-100 font-body border-cyan-700 rounded p-10 shadow-2xl">
      <h2 className="font-semibold text-3xl">LOGIN</h2>
      <div className="text-lg mt-5">
        <h3>Username</h3>
        <input
          type="text"
          onChange={(e) => {
            setError(false);
            setUsername(e.target.value);
          }}
          className="outline-none rounded text-cyan-900 py-1 px-2"
        />
        <h3 className="mt-2">Password</h3>
        <input
          type="password"
          onChange={(e) => {
            setError(false);
            setPassword(e.target.value);
          }}
          className="outline-none rounded text-cyan-900 py-1 px-2"
        />
      </div>
      {error && (
        <p className="text-xs text-red-600 sm:text-sm">
          Please enter correct credentials.
        </p>
      )}
      <button
        className={`w-full mt-5 rounded py-1 font-body text-lg ${
          loading
            ? "bg-gray-500"
            : "bg-cyan-900 border border-cyan-500 hover:bg-cyan-400 active:scale-[.98]"
        }  duration-200 shadow-xl`}
        onClick={submitHandler}
      >
        LOGIN
      </button>
    </div>
  );
};

export default Login;
