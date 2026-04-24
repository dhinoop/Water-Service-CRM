import { useState } from "react";
import API from "./api";

function Login({ setAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await API.post("/login", { username, password });
      setAuth(true);
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-900">

      <div className="bg-slate-800 p-8 rounded-xl shadow-lg w-80">
        <h2 className="text-2xl text-white mb-6 text-center">💧 Water CRM</h2>

        <input
          className="w-full mb-3 p-2 rounded bg-slate-700 text-white"
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-2 rounded bg-slate-700 text-white"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded text-white"
        >
          Login
        </button>
      </div>

    </div>
  );
}

export default Login;