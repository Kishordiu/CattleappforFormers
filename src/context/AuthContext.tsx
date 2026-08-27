import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import i18n from '@/i18n/config';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  farmName: string;
  role: 'farmer' | 'veterinarian' | 'admin';
  language: 'en' | 'ta';
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  farmName: string;
  language: 'en' | 'ta';
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = 'ki_users';
const SESSION_KEY = 'ki_session';

function getUsers(): Array<AuthUser & { password: string }> {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveUsers(users: Array<AuthUser & { password: string }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restore session on page load
    try {
      const session = localStorage.getItem(SESSION_KEY);
      if (session) {
        const parsed: AuthUser = JSON.parse(session);
        setUser(parsed);
        i18n.changeLanguage(parsed.language);
      }
    } catch {
      // ignore
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const users = getUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      return { success: false, error: 'Invalid email or password.' };
    }
    const { password: _pw, ...authUser } = found;
    setUser(authUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(authUser));
    localStorage.setItem('ki_language', authUser.language);
    i18n.changeLanguage(authUser.language);
    return { success: true };
  };

  const register = async (data: RegisterData) => {
    const users = getUsers();
    if (users.find((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    const newUser: AuthUser & { password: string } = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      password: data.password,
      farmName: data.farmName,
      role: 'farmer',
      language: data.language,
    };
    saveUsers([...users, newUser]);
    const { password: _pw, ...authUser } = newUser;
    setUser(authUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(authUser));
    localStorage.setItem('ki_language', data.language);
    i18n.changeLanguage(data.language);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
