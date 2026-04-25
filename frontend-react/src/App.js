import { useEffect, useState } from "react";
import API from "./api";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
  const [auth, setAuth] = useState(null); // null = loading

  // ✅ Check session on load
  useEffect(() => {
    API.get("/check-auth")
      .then(res => {
        setAuth(res.data.authenticated);
      })
      .catch(() => setAuth(false));
  }, []);

  // ⏳ loading state
  if (auth === null) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return auth ? (
    <Dashboard setAuth={setAuth} />
  ) : (
    <Login setAuth={setAuth} />
  );
}

export default App;