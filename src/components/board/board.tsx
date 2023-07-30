import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'; // Import useParams to get the board id from the URL
import axios from 'axios';
import { useAuth } from '../../auth/authContext';
import Sidebar from '../nav-bar/leftSideBar';
import { CardContainer, MainContentContainer, PageHeader } from '../../styles/styles';

interface BoardData {
  id: number;
  name: string;
  posts: [{[key: string]: string}];
  owner: string;
  //posts:[string[];
}

const Board: React.FunctionComponent = () => {
  const [board, setBoard] = useState<BoardData | null>(null);
  const { name } = useParams();
  const { authenticated, user } = useAuth()
  const location = useLocation();
  const admin: boolean = false;

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        // Fetch the board data from the API using the board id
        const response = await axios.get<BoardData>(`/api/board/${name}`);
        setBoard(response.data);
      } catch (error) {
        console.error('Error fetching board:', error);
      }
    };

    fetchBoard();
  }, []);
  const navigate = useNavigate();
  const handleCreatePost = () => {
    navigate(`/board/${name}/newpost`);
  };
  if (!board) {
    return <div>Loading..</div>;
  }
  //console.log("board was" + JSON.stringify(board))
  return (
    
    <MainContentContainer>
      <Sidebar>
      <PageHeader>{board.name}</PageHeader>
      { authenticated ? <button onClick={handleCreatePost}>Create Post</button> :
          <NavLink to={`/auth`}  state={{ prev: location.pathname }}>Sign in To Make a New Post</NavLink>}
      <ul>
        <CardContainer><li key={board.id}>{board.name}</li>
        {board.posts.length > 0 ? (
          board.posts.map((post) => <li key={post.title}>{post.title}</li>)
        ) : (
          <p>"no posts"</p>
        )}</CardContainer>
      </ul>
      </Sidebar>
    </MainContentContainer>
  );
};

export default Board;
