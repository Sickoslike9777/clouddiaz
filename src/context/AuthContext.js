'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Функция Входа
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 👇 Функция РЕГИСТРАЦИИ (Проверь, что она тут есть!)
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Функция Выхода
  const logout = () => {
    return signOut(auth);
  };

  return (
    // 👇 ВАЖНО: Проверь, что слово 'register' есть внутри этих скобок {{ }}
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);