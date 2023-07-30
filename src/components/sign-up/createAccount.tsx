import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth  } from '../../auth/authContext'

interface RegisterFormData {
    email: string;
    name: string;
    password: string;
  }

const CreateAccount: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RegisterFormData>({
        email: '',
        name: '',
        password: '',
      });
    // const { authenticated, signIn } = useAuth()

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
      const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
          const response = await axios.post('/api/create-account', formData);
          console.log(response.data); // User data from the server (e.g., user ID, name, etc.)
          // You can redirect the user to a success page or handle the response as needed
        } catch (error: any) {
          console.log('Error creating user:', error.response.data);
        }
        navigate('/auth')
    }
      return (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" name="email" onChange={handleChange} />
          </div>
          <div>
            <label>Name:</label>
            <input type="text" name="name" onChange={handleChange} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" onChange={handleChange} />
          </div>
          <button type="submit">Register</button>
        </form>
      );
    };

export default CreateAccount;
