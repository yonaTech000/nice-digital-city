'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Booking } from './types';

export type ThemePreference = 'light' | 'dark';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}

interface ThemeContextType {
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
  toggleTheme: () => void;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'isRead' | 'createdAt'>) => void;
  markAllRead: () => void;
  dismissNotification: (id: string) => void;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (name: string, email: string, password: string, phone?: string) => void;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, booking: Partial<Booking>) => void;
  cancelBooking: (id: string) => void;
  getUserBookings: () => Booking[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const BookingContext = createContext<BookingContextType | undefined>(undefined);

const MOCK_USERS = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'user@example.com',
    password: 'password123',
    phone: '254712345678',
    role: 'USER' as const,
  },
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    phone: '254700000000',
    role: 'ADMIN' as const,
  },
];

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemePreference>('dark');

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('siteTheme') : null;
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
      document.documentElement.classList.toggle('dark', stored === 'dark');
    } else if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('siteTheme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('notifications') : null;
    if (stored) {
      setNotifications(JSON.parse(stored));
    }
  }, []);

  const saveNotifications = (updated: Notification[]) => {
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'isRead' | 'createdAt'>) => {
    const nextNotification: Notification = {
      id: `notif-${Date.now()}`,
      isRead: false,
      createdAt: new Date().toISOString(),
      ...notification,
    };
    saveNotifications([nextNotification, ...notifications]);
  };

  const markAllRead = () => {
    saveNotifications(notifications.map((item) => ({ ...item, isRead: true })));
  };

  const dismissNotification = (id: string) => {
    saveNotifications(notifications.filter((item) => item.id !== id));
  };

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAllRead,
        dismissNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('currentUser') : null;
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = (email: string, password: string) => {
    const found = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (found) {
      const userData = { id: found.id, name: found.name, email: found.email, phone: found.phone, role: found.role };
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const register = (name: string, email: string, password: string, phone?: string) => {
    if (MOCK_USERS.find((u) => u.email === email)) {
      throw new Error('Email already registered');
    }
    const newUser: {
      id: string;
      name: string;
      email: string;
      phone: string;
      role: 'USER';
    } = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone: phone ?? '',
      role: 'USER',
    };
    MOCK_USERS.push({ ...newUser, password });
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user?.role === 'ADMIN',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { user } = useContext(AuthContext) || {};

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('bookings') : null;
    if (stored) {
      setBookings(JSON.parse(stored));
    }
  }, []);

  const saveBookings = (updated: Booking[]) => {
    setBookings(updated);
    localStorage.setItem('bookings', JSON.stringify(updated));
  };

  const addBooking = (booking: Booking) => {
    const updated = [...bookings, booking];
    saveBookings(updated);
  };

  const updateBooking = (id: string, data: Partial<Booking>) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, ...data } : b));
    saveBookings(updated);
  };

  const cancelBooking = (id: string) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status: 'CANCELLED' as const } : b));
    saveBookings(updated);
  };

  const getUserBookings = () => {
    if (!user) return [];
    return bookings.filter((b) => b.userId === user.id);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        addBooking,
        updateBooking,
        cancelBooking,
        getUserBookings,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within BookingProvider');
  }
  return context;
}
