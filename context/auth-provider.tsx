import { createContext, useContext, useState } from "react";
import { useRouter, useSegments } from "expo-router";

type User = {
  id: string;
  email: string;
  name: string;
  username: string;
  role: string;
  created_at: string;
};

type AuthContextProps = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextProps>({
  user: null,
  signIn: async () => { },
  signUp: async () => { },
  signOut: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const segments = useSegments();
  const [user, setUser] = useState<User | null>(null);

  const dummyUser: User = {
    id: "1",
    email: "user@example.com",
    name: "John Doe",
    username: "johndoe",
    role: "user",
    created_at: new Date().toISOString(),
  };

  const signIn = async (email: string, password: string) => {
    if (email === "user@example.com" && password === "password123") {
      setUser(dummyUser);
      router.replace("/(app)/(protected)/home");
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const signUp = async (email: string, password: string) => {
    if (email && password) {
      setUser(dummyUser);
      router.replace("/(app)/(protected)/home");
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const signOut = async () => {
    setUser(null);
    router.replace("/(app)/welcome");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}; 