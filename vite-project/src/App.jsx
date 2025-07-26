import { useState } from "react";
import Message from "./Message";
import ProfileSummary from "./ProfileSummary";
import AvatarUpload from "./AvatarUpload";
import LoginForm from "./Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [forms, formUpdate] = useState("");
  const [BackendData, SetBackendData] = useState(null);

  function handleLogin(ID, password) {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname: ID, password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Login success:", data);
        SetBackendData(data);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
  }

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div>
      <Message setActiveSection={formUpdate} />
      {forms === "profile" && <ProfileSummary />}
      {forms === "avatar" && <AvatarUpload />}
    </div>
  );
}

export default App;
