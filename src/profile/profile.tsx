import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthContextProps, useAuth } from '../auth/authContext'
import { PageHeader } from '../styles/styles';



interface MockProfile {
    id: number;
    name: string;
    posts: string[];
  }
  interface User {
    id: number;
    username: string;
    name: string;
    password: string;
  }
const Profile = () => {
    const [boards, setBoards] = useState<MockProfile | null>(null);
    const { authenticated, user } = useAuth() as AuthContextProps
    return (
        <div>
        {authenticated ? 
        (<PageHeader>{user?.name}</PageHeader>)
         : ("user not found")}
        </div>
    )
}
export default Profile;