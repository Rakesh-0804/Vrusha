import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('vruksha_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem('vruksha_token') || null;
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('vruksha_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('vruksha_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('vruksha_token', token);
    } else {
      localStorage.removeItem('vruksha_token');
    }
  }, [token]);

  const registerUser = async ({ name, email, phone, password, address, pincode }) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password, address, pincode })
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Registration failed');
    }
    setUser(data.user);
    setToken(data.token);
    setIsLoginModalOpen(false);
    return data;
  };

  const loginWithCredentials = async ({ identifier, password }) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password })
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Invalid credentials');
    }
    setUser(data.user);
    setToken(data.token);
    setIsLoginModalOpen(false);
    return data;
  };

  const loginWithOTP = async (identifier, name, otp, extra = {}) => {
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, otp, name, ...extra })
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'OTP verification failed');
    }
    setUser(data.user);
    setToken(data.token);
    setIsLoginModalOpen(false);
    return data;
  };

  const loginWithGoogle = async (googleProfile) => {
    const res = await fetch('/api/auth/google/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(googleProfile)
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Google authentication failed');
    }
    setUser(data.user);
    setToken(data.token);
    setIsLoginModalOpen(false);
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      registerUser,
      loginWithCredentials,
      loginWithOTP,
      loginWithGoogle,
      logout,
      isLoginModalOpen,
      setIsLoginModalOpen
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

