import { useState, useEffect } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import API from "./api";

function App() {
  const [auth, setAuth] = useState(false);

  // Check login on load
  useEffect(() => {
    API.get("/check-auth")
      .then(() => setAuth(true))
      .catch(() => setAuth(false));
  }, []);

  return auth ? <Dashboard setAuth={setAuth} /> : <Login setAuth={setAuth} />;
}

export default App;