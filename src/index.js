import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SignIn from './components/sign-in/signIn'
import AuthContext, { AuthProvider } from './auth/authContext'
import AuthWrapper from './auth/authWrapper'
import Sidebar from './components/nav-bar/leftSideBar';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* <AuthProvider>
      <AuthWrapper> */}
      { <App></App>}
      {/* </AuthWrapper>
    </AuthProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
