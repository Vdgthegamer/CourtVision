import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const DEMO_USERS_KEY = "cv_demo_users";
const CURRENT_USER_KEY = "cv_current_user";

function getDemoUsers() {
  try {
    return JSON.parse(localStorage.getItem(DEMO_USERS_KEY)) || {};
  } catch {
    return {};
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }
    setTimeout(() => setLoading(false), 800);
  }, []);

  const signUp = async (email, password, name) => {
    setAuthError(null);
    await new Promise(r => setTimeout(r, 600));
    const users = getDemoUsers();
    if (users[email]) {
      setAuthError("An account with this email already exists.");
      return false;
    }
    const newUser = {
      id: `user_${Date.now()}`,
      email,
      name: name || email.split("@")[0],
      created_at: new Date().toISOString(),
      avatar: name ? name.charAt(0).toUpperCase() : email.charAt(0).toUpperCase(),
    };
    users[email] = { ...newUser, password };
    localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  const signIn = async (email, password) => {
    setAuthError(null);
    await new Promise(r => setTimeout(r, 600));
    const users = getDemoUsers();
    const found = users[email];
    if (!found || found.password !== password) {
      setAuthError("Invalid email or password.");
      return false;
    }
    const { password: _, ...userWithoutPassword } = found;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);
    return true;
  };

  const signOut = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, authError, signUp, signIn, signOut, setAuthError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}