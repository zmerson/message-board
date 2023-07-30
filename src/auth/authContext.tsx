import React, { useState, useContext, createContext, FC, FunctionComponent, ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//https://stackoverflow.com/questions/72163183/how-can-i-redirect-to-previous-page-after-login-in-react-router
// Create the AuthContext
export const AuthContext = createContext<AuthContextProps | null>(null);
export interface UserData {
  id: number;
  username: string;
  name: string;
  password: string;
}

export interface AuthContextProps {
  authenticated: boolean;
  user: UserData | null;
  signIn: (user: UserData) => void;
  signOut: () => void;
  updateAuthState: (authenticated: boolean, user: UserData | null) => void;
  lastVisitedPage: string | null;
}
interface AuthProviderProps {
  children: ReactNode; 
}

export const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [lastVisitedPage, setLastVisitedPage] = useState<string | null>(null);


  const signIn = (userData: UserData) => {
    setAuthenticated(true);
    console.log('signed in as ' + JSON.stringify(userData))
    setUser(userData)
  };

  const signOut = () => {
    setAuthenticated(false);
    console.log('signed out')
    setUser(null)
  };
  const updateAuthState = (authenticated: boolean, user: UserData | null) => {
    setAuthenticated(authenticated);
    setUser(user);
  };
  return (
    <AuthContext.Provider value={{ user , authenticated, signIn, signOut, updateAuthState, lastVisitedPage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('useAuth must be used within an AuthProvider');
  return auth;
};