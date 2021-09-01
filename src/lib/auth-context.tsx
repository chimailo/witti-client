import React, { createContext, useEffect, useState } from 'react';
import { setToken } from './utils';
import firebase from './firebase';

interface InitialStateProps {
  isLoading: boolean;
  isAuthenticated: boolean;
  error: firebase.auth.Error | null;
  handleLogout: () => void;
}

const initialState: InitialStateProps = {
  isLoading: true,
  isAuthenticated: false,
  error: null,
  handleLogout: () => {},
};

export const AuthContext = createContext<InitialStateProps>(initialState);

export default function AuthUserContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState<firebase.auth.Error | null>(null);

  useEffect(() => {
    try {
      const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          setToken(await user.getIdToken(true));
          setAuthenticated(true);
          setLoading(false);
        }
      });
      return () => unsubscriber();
    } catch (err) {
      setError(err);
    }
  }, []);

  const handleLogout = async () => {
    await firebase.auth().signOut();
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoading, isAuthenticated, error, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);
