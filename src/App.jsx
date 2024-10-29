import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";

export default function App() {
  return (
    <div>
      <div className="text-4xl flex justify-center items-center font-bold text-white py-10">ZK-Based Authentication System</div>
      <Register />
      <Login />
    </div>
  );
}
