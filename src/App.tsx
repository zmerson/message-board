// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BoardList from './components/board-list/boardList';
import NavBar from './components/nav-bar/navBar'
import SignInComponent from './components/sign-in/signIn'
import axios from 'axios';
import Board from './components/board/board'
import Profile from './profile/profile'
import { AuthProvider, useAuth, AuthContextProps } from './auth/authContext';
import AuthWrapper from './auth/authWrapper';
import Home from './components/home';
import AdminPage from './admin/adminPage';
import CreateAccount from './components/sign-up/createAccount';
import CreateBoard from './components/board/createBoard';
import NewPost from './components/board/newPost';
axios.defaults.baseURL = 'https://localhost:5000';

// Set default headers for all requests (e.g., for JWT authentication)
//axios.defaults.headers.common['Authorization'] = 'Bearer ' + YOUR_JWT_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';


const App: React.FunctionComponent = () => {

  return (
    <Router>
      <AuthProvider>
        <AuthWrapper>
          {(authenticated: boolean) => (
            <>
              <NavBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/newBoard" element={authenticated ? <CreateBoard /> : <Navigate to="/auth" />} />
                <Route path="/list" element={<BoardList />} />
                <Route path="/board/:name" element={<Board/>} />
                <Route path="/board/:name/newpost" element={authenticated ? <NewPost /> : <NewPost/>} />
                <Route path="/profile" element={authenticated ? <Profile /> : <SignInComponent />} />
                <Route path="/profile/:name" element={<Profile />} />
                <Route path="/auth" element={authenticated ? <></> : <SignInComponent />} />
                <Route path="/admin" element={authenticated ? <AdminPage /> : <AdminPage />} />
                <Route path="/register" element={authenticated ? <Home /> : <CreateAccount />} />
              </Routes>
            </>
          )}
        </AuthWrapper>
      </AuthProvider>   
    </Router>
  );
};

export default App;


/* <Routes>
          <AuthProvider>
              {(authenticated: boolean) => (
                <>
              )}
          <Route path="/" element={<NavBar/>}>
          <Route exact path="/list" element={<BoardList/>} />
          <Route exact path="/board/:id" element={<Board/>} />
          <Route exact path="/auth" element={<SignInComponent />} />
          {(authenticated ? <Route exact path="/profile" element={<Profile />} /> : console.log("not authenticated") )}
          </Route>
          </AuthProvider>
      </Routes> */