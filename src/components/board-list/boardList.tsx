
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CardContainer, MainContentContainer } from '../../styles/styles';
import BoardListItem from './boardListItem';

export interface BoardData {
  id: number;
  name: string;
  posts: string[];
}

const BoardList: React.FunctionComponent = () => {
  const [boards, setBoards] = useState<BoardData[] | null>(null);
  
  useEffect(() => {

    axios.get('/api/boards').then((response) => {
      setBoards(response.data);
    });
  }, []);

  if (!boards){
    return <div>Loading..</div>
  }
  return (
    <MainContentContainer>
      <div>
        <h2>Message Boards</h2>
        <ul>
          {boards.map((board) => (
            <BoardListItem board={board}/>
          ))
          }
        </ul>
      </div>
    </MainContentContainer>
  );
};

export default BoardList;

// {boards?.map((board) => (
//   <Card><li key={board.id}><Link to={`/board/${board.name}`}>{board.name}</Link></li></Card>
// ))}