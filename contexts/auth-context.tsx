import { use, createContext, type PropsWithChildren, useState } from "react";

import { useStorageState } from "@/hooks/use-storage";

type SignInInput = {
  username: string;
  password: string;
  testingMode?: boolean;
};
type SignUpInput = {
  username: string;
  email: string;
  password: string;
};

const AuthContext = createContext<{
  signIn: (input: SignInInput) => Promise<boolean>;
  signUp: (input: SignUpInput) => Promise<{ id: number } | null>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  userName: string | null;
  setUserName: (userName: string | null) => void;
}>({
  signIn: async (_input: SignInInput) => false,
  signUp: async (_input: SignUpInput) => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  userName: null,
  setUserName: (_userName: string | null) => {},
});

// Use this hook to access the user info.
export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [userName, setUserName] = useState<string | null>(null);

  return (
    <AuthContext.Provider
      value={{
        signIn: async ({ username, password, testingMode }: SignInInput) => {
          const credentials = { username, password };

          if (testingMode) {
            const allUsers = await fetch("https://fakestoreapi.com/users").then(
              (response) => response.json()
            );
            const firstUser = allUsers[0];
            credentials.username = firstUser.username;
            credentials.password = firstUser.password;
          }
          const response = await fetch("https://fakestoreapi.com/auth/login", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });

          if (response.status === 401) {
            throw new Error("User doesn't exist");
          }

          const data = await response.json();
          if (!data || !data.token) {
            throw new Error("Authorization failed: no token.");
          }
          setSession(data.token);
          return true;
        },
        signUp: async ({ username, password, email }: SignUpInput) => {
          const newUser = await fetch("https://fakestoreapi.com/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, email }),
          }).then((response) => response.json());

          return newUser ?? null;
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
        setUserName: (name: string | null) => {
          setUserName(name);
        },
        userName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
