import { useState } from "react";
import type { FormEvent } from "react"
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    try {
      const response = await login({ email, password });
      localStorage.setItem("access_token", response.access_token);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  }

  return (
    <main style={{ maxWidth: "420px", margin: "48px auto" }}>
      <h1>登入</h1>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">登入</button>
      </form>

      <p>
        還沒有帳號？ <Link to="/register">註冊</Link>
      </p>
    </main>
  );
}