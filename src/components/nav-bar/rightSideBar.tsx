import React, { ReactNode, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AuthContext, UserData, useAuth } from '../../auth/authContext';
import { BoardData } from '../board-list/boardList';
import axios from 'axios';
import ModTools from '../../admin/modTools';

const SidebarContainer = styled.div`
  width: 150px;
  background-color: #f0f0f0;
  padding: 50px 0 0 0;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);

`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: 
`;
const BoardDescription = styled.div`
  display: flex;
  align-items: center;
  
`;

const SidebarArrow = styled.div`
  width: 16px;
  height: 16px;
  border: 1px solid #333;
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SidebarButton = styled.button<{ user: UserData }>`
  background-color: ${(props) => props.user !== undefined ? 'blue' : 'red'};
`
const SidebarContent = styled.div`
`;

const SubscribeButton = styled.a`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  text-decoration: none;
  color: #333;
  cursor: pointer;
`;
const SidebarLink = styled.a`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  text-decoration: none;
  color: #333;
  border: solid 1px;
`;

const SidebarIcon = styled.a`
  width: 20px;
  height: 20px;
  background-color: #333;
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

interface Children {
  children: ReactNode; 
}
interface BoardInfo {
  subscribed: boolean
}
interface BoardProps {
  board:  {
    id: number;
    name: string;
    posts: [{[key: string]: string}];
    owner: string;
  };
}
// const BoardInfo = ({children}: Children  ): React.ReactNode => {
const BoardInfo: React.FunctionComponent<BoardProps> = ({board}) => {
  const { user, authenticated } = useAuth();
  const [isLoading, setIsLoading ] = useState(true)
  // const [ boardInfo, setBoardInfo ] = useEffect(checkSubscribed());
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [ tags, setTags ] = useState('test')
  const [ showModTools, setShowModTools ] = useState(false)
  const [ userRole, setUserRole ] = useState('STANDARD')
  const [ hiddenstate, sethiddenState ] = useState(false)
  
  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (!user){
        setIsLoading(false);
        return
      }
      try {
      if (user){
        const response = await axios.post(`/api/board/info/subscribed`, {userId: user.id, boardId: board.id}); 
        console.log(response)
        console.log("subscribed was " + response.data.subscribed)
        setIsLoading(false)
        const userRole = await axios.post(`/api/board/${board.name}/userRole`, {userId: user.id, boardId: board.id})
        //const userRole = JSON.stringify(role)
        console.log(userRole)
        setUserRole(userRole.data.role)
        setIsSubscribed(userRole.data.subscribed);
      }
       else {
        console.log("no user, sign in please")
       }
        // console.log(user)
      } catch (error) {
        console.error('Error fetching subscription status:', error);
      }
    };

    fetchSubscriptionStatus();
  }, [isSubscribed]);

  useEffect(() => {
    const getTags = async () => {
      // const response = await axios.get(`/api/board/info/${board.name}/tags`)
      // return response
    }
    
   }, [tags])
  // const checkSubscribed = async () => {
  // const response = await axios.post(`/api/board/info/subscribed`, {userId: user!.id, boardId: board.id})  
  //   setBoardInfo(response)
  // }
  const getTags = async () => {
    const response = await axios.get(`/api/board/info/${board.name}/tags`)
    setTags(JSON.stringify(response))
    return response
  }
 
  const tagOnClick = async () => {
    const response = getTags();
  }
  const unSubscribe = async () => {
    setIsSubscribed(false)
    const response = await axios.post(`/api/unsubscribe`, {userId: user!.id, boardId: board.id})  
    setIsSubscribed(false)
    window.alert("you have clicked unsubscribe")
  } 
  
  // const toggleSidebar = () => {
  //   console.log(expanded)
  //   expanded === 'true' ? setExpanded('false') : setExpanded('true')
  //   //setExpanded((expanded) => !expanded);
  // };
  const subscribe = async () => {
    const response = await axios.post('api/subscribe', {userId: user!.id, boardName: board.name})
    window.alert("you have clicked subscribe")
    setIsSubscribed(true)
  }
  const toggleModTools = () => {
    setShowModTools(!showModTools);
  } 
  if (isLoading){
    return <div>loading</div>
  }
  function toggleHiddenstate() {
    sethiddenState(!hiddenstate)
  }

  return (
    <SidebarContainer>
     <SidebarHeader> 
        <h2>{board.name}</h2>
      </SidebarHeader> 
      <BoardDescription onClick={toggleHiddenstate}>description about the board from database that can be shrunk down</BoardDescription>
      <SidebarContent>
        { user && isSubscribed ? <SubscribeButton onClick={unSubscribe} >unSubscribe</SubscribeButton> : <SubscribeButton onClick={subscribe}>Subscribe</SubscribeButton>}
        <SidebarLink href="#">Tags</SidebarLink>
        <SidebarLink href="#">console</SidebarLink>
        <SidebarLink href="#" onClick={toggleModTools}>mod tools</SidebarLink>
        {/* Add more links and icons as needed */}
      </SidebarContent>
     {showModTools && (<ModTools userRole={userRole} />)} {/* Render the moderation tools */}
    </SidebarContainer>
  );
};

export default BoardInfo;


