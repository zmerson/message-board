import React, { useContext, useEffect, useState } from 'react';
import jwtDecode, { JwtPayload } from 'jwt-decode'; // You'll need to install the 'jwt-decode' library
import { useAuth, AuthContextProps, AuthProvider, AuthContext, UserData } from './authContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface MyJwtPayload {
    id: number;
    name: string;
    email: string;
    exp: number;
  }
interface AuthWrapperProps {
  children: (authenticated: boolean) => React.ReactNode;
}

const AuthWrapper: React.FunctionComponent<AuthWrapperProps> = ({ children }) => {
const { authenticated, updateAuthState } = useContext(AuthContext) as AuthContextProps; 
  const [auth, setAuthenticated] = useState(authenticated);
  const [loading, setLoading] = useState(true);
 


  //console.log("init auth " + auth)
  useEffect(() => {
    // Check if the user is authenticated in LocalStorage and update the app state
    const token = localStorage.getItem('jwt');
    if (token) {
      const decodedToken = jwtDecode<MyJwtPayload>(token);
      // Check if the token has expired
      if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
        setAuthenticated(true);
        const userData: UserData = {
            id: decodedToken.id,
            username: decodedToken.name,
            email: decodedToken.email,
            password: ''
        };
        updateAuthState(true, userData);
        //console.log(JSON.stringify("token.exp: "+ decodedToken.exp))
      } else {
         localStorage.removeItem('jwt');
        localStorage.setItem('authenticated', 'false');
        //console.log("removed token")
        setAuthenticated(false);
        updateAuthState(false, null);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log("Updated auth value: " + auth);
  }, [auth]);
  if (loading) {

    return <div>Loading Auth...</div>;
  }
  return <>{children(authenticated)}</>;
};

export default AuthWrapper;