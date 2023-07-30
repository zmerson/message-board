import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth  } from '../../auth/authContext'

const SignInComponent = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setAuthenticated] = useState(false);
    // const { authenticated, signIn } = useAuth()
    const authContext = useAuth()
    const { state } = useLocation();
    const handleSignIn = async () => {
        try {
        const response = await axios.post('/api/login', {
            email,
            password,
        });
        const { user, token } = response.data;
        Cookies.set('jwt', token, { expires: 1 });
        localStorage.setItem('jwt', token);
        localStorage.setItem('authenticated', 'true');
        setAuthenticated(true);
        if (authContext){
          authContext.signIn(user)
        }
      if (state){
          console.log("state was " + JSON.stringify(state))
          navigate(state.prev)
      }else {
          navigate('/list')
      }
      } catch (error) {
        console.error('Error signing in:', error);
      }
  };

  return (
    <div>
        <div> 
        {/* {make this a styled container} */}
      <h2>Sign In</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign In</button>
      </div>
      <div>Don't have an account?</div>
      <Link to={'/create-account'}>Create Account</Link>
    </div>
  );
};

export default SignInComponent;
