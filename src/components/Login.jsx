import React, { useState } from "react";
import { generate_proof, verify_proof } from "../pkg/zk_wasm";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true to show the spinner and disable the button

    // Wait for the loading state to reflect in the UI before running proofs
    setTimeout(async () => {
      const storedHash = JSON.parse(localStorage.getItem(username));
      if (!storedHash) {
        alert("User not found");
        setLoading(false);
        return;
      }

      try {
        // Generate proof using username and password
        const proof = await generate_proof(username, password);

        // Verify proof - catch any errors during verification
        const isValid = await verify_proof(proof, storedHash, username);

        if (isValid) {
          alert("Login successful!");
        } else {
          alert("Invalid username or password.");
        }
      } catch (error) {
        console.error("Verification failed:", error);
        alert("Invalid username or password.");
      } finally {
        setLoading(false); // Re-enable button after verification
        setUsername(""); // Clear username
        setPassword(""); // Clear password
      }
    }, 0); // Run the proof generation and verification after a brief timeout
  };

  return (
    <div className="flex items-center justify-center py-5">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 rounded flex items-center justify-center ${
            loading ? "cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
