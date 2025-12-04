'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
// 👇 Импортируем setDoc вместо updateDoc для безопасной записи
import { doc, getDoc, setDoc, arrayUnion } from 'firebase/firestore'; 

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Данные
  const [balance, setBalance] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setBalance(data.balance || 0);
          setSubscription(data.subscription || null);
          setOrders(data.orders || []);
        } else {
          // 👇 ЕСЛИ ДОКУМЕНТА НЕТ (Старый аккаунт) — СОЗДАЕМ ЕГО НА ЛЕТУ
          await setDoc(docRef, {
            email: currentUser.email,
            balance: 0,
            subscription: null,
            orders: []
          });
          setBalance(0);
          setSubscription(null);
          setOrders([]);
        }
      } else {
        setBalance(0);
        setSubscription(null);
        setOrders([]);
      }
      
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const register = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Создаем запись при регистрации
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      balance: 0,
      subscription: null,
      orders: []
    });

    return userCredential;
  };

  const logout = () => signOut(auth);

  // === ИСПРАВЛЕННЫЕ ФУНКЦИИ (setDoc + merge) ===

  const addBalance = async (amount) => {
    if (!user) return;
    const newBalance = balance + amount;
    setBalance(newBalance);
    // 👇 setDoc с merge: true создаст документ, если его нет
    await setDoc(doc(db, "users", user.uid), { balance: newBalance }, { merge: true });
  };

  const buySubscription = async (planName, cost, period) => {
    if (balance >= cost && user) {
      const newBalance = balance - cost;
      const newSub = { name: planName, expires: period === 'year' ? 365 : 30 };
      
      setBalance(newBalance);
      setSubscription(newSub);

      // 👇 Безопасное обновление
      await setDoc(doc(db, "users", user.uid), { 
        balance: newBalance,
        subscription: newSub
      }, { merge: true });
      
      return { success: true };
    }
    return { success: false };
  };

  const addOrder = async (newOrder) => {
    if (!user) return;
    setOrders((prev) => [newOrder, ...prev]);
    
    // 👇 Безопасное добавление заказа
    await setDoc(doc(db, "users", user.uid), {
      orders: arrayUnion(newOrder)
    }, { merge: true });
  };

  return (
    <AuthContext.Provider value={{ 
      user, login, register, logout, loading,
      balance, addBalance,
      subscription, buySubscription,
      orders, addOrder
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);