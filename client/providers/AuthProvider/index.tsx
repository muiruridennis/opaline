"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CURRENT_USER, LOGOUT_MUTATION } from '@/graphql/auth';

interface AuthContextType {
  user: any;
  loading: boolean;
  error: any;
  signout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider:  React.FC<{ children: ReactNode }>= ({ children }) => {
  const [user, setUser] = useState(null);

  const [logout] = useMutation(LOGOUT_MUTATION);
  const { data:userData, loading, error } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "network-only", 
    nextFetchPolicy: 'cache-first',
  });


  useEffect(() => {
    if (userData && userData.getCurrentUser) {
      setUser(userData.getCurrentUser);
    }
  }, [userData]);

  const signout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  

  return (
    <AuthContext.Provider value={{ user, loading, error, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
