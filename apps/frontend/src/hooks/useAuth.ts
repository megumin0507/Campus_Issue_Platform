import { useEffect, useState } from "react";
import type { User } from "../types/user";
import { getMe, login, register } from "../api/auth";
import type { LoginInput, RegisterInput } from "../api/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const currentUser = await getMe();
      setUser(currentUser);
    } catch {
      localStorage.removeItem("access_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function loginUser(input: LoginInput) {
    const response = await login(input);
    localStorage.setItem("access_token", response.access_token);
    setUser(response.user);
  }

  async function registerUser(input: RegisterInput) {
    const response = await register(input);
    localStorage.setItem("access_token", response.access_token);
    setUser(response.user);
  }

  function logoutUser() {
    localStorage.removeItem("access_token");
    setUser(null);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return {
    user,
    loading,
    loginUser,
    registerUser,
    logoutUser,
  };
}