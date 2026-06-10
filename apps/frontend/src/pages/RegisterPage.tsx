import { useState } from "react";
import type { FormEvent } from "react"
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/auth";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    try {
      const response = await register({ name, email, password });
      localStorage.setItem("access_token", response.access_token);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Register failed");
    }
  }

  return (
    <main style={{ maxWidth: "420px", margin: "48px auto" }}>
      <h1>註冊</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            style={{ display: "block", width: "100%", marginBottom: "16px" }}
          />
        </label>

        <label>
          Email
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            required
            style={{ display: "block", width: "100%", marginBottom: "16px" }}
          />
        </label>

        <label>
          Password
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            required
            style={{ display: "block", width: "100%", marginBottom: "16px" }}
          />
        </label>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">註冊</button>
      </form>

      <p>
        已經有帳號？ <Link to="/login">登入</Link>
      </p>
    </main>
  );
}