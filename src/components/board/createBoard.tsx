import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContextProps, useAuth } from '../../auth/authContext';

interface Board {
  id: number;
  name: string;
  owner: {
    id: number;
    name: string;
  };
  posts: string[];
}
interface UserRole {
  userId: number;
  boardId: number;
  role: String;
  subscribed: boolean
}
const CreateBoard: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { authenticated, user } = useAuth() as AuthContextProps
  const [boardName, setBoardName] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBoardName(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
        if (!authenticated || !user){
            navigate('/auth')
            return;
        }
      const response = await axios.post<Board>('/api/newboard', { name: boardName, userId: user.id }); // Replace '1' with the actual user ID
      const newBoardName = response.data.name;
      console.log("here")
      if (newBoardName){
        const userRole = await axios.post<UserRole>('/api/newboard/set-owner', { boardId: response.data.id, userId: user.id });
      
      // Redirect the user to the newly created board page
      navigate(`/board/${newBoardName}`);
    }
    } catch (error) {
      console.error('Error creating board:', error);
      // Handle error if board creation fails (e.g., show an error message to the user)
    }
  };

  return (
    <div>
      <h2>Create a New Board</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="boardName">Board Name:</label>
        <input
          type="text"
          id="boardName"
          value={boardName}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Board</button>
      </form>
    </div>
  );
};

export default CreateBoard;