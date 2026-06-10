export type User = {
  user_id: string;
  name: string;
  email: string;
  role: "normal" | "admin" | "official";
};

export type AuthResponse = {
  access_token: string;
  token_type: "bearer";
  user: User;
};