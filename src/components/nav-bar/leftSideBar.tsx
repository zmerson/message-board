import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div<{ expanded: string }>`
  width: ${(props) => (props.expanded === 'true' ? '150px' : '100px')};
  background-color: #f0f0f0;
  padding: 50px 0 0 0;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
`;

const SidebarHeader = styled.div<{ expanded: string }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: ${(props) => (props.expanded === 'true' ? '100%' : '50%')};
`;

const SidebarArrow = styled.div<{ expanded: string }>`
  width: 16px;
  height: 16px;
  border: 1px solid #333;
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${(props) => (props.expanded === 'true' ? 'rotate(0)' : 'rotate(-90deg)')};
  transition: transform 0.2s ease-in-out;
`;

const SidebarContent = styled.div<{ expanded: string }>`
  display: ${(props) => (props.expanded === 'true' ? 'block' : 'none')};
`;

const SidebarLink = styled.a`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  text-decoration: none;
  color: #333;
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
interface AuthProviderProps {
  children: ReactNode; 
}
const Sidebar = ({ children }: AuthProviderProps): React.ReactNode => {
  const [expanded, setExpanded] = useState('true');

  const toggleSidebar = () => {
    console.log(expanded)
    expanded === 'true' ? setExpanded('false') : setExpanded('true')
    //setExpanded((expanded) => !expanded);
  };
  return (
    <><SidebarContainer expanded={expanded}>
      <SidebarHeader onClick={toggleSidebar} expanded={expanded}>
        <SidebarArrow expanded={expanded}></SidebarArrow>
        <h2>Sidebar</h2>
      </SidebarHeader>
      {expanded === 'true' ? <SidebarContent expanded={expanded}>
        <SidebarLink href="#">Top</SidebarLink>
        <SidebarLink href="#">Tags</SidebarLink>
        <SidebarLink href="#">console</SidebarLink>
        <SidebarLink href="#">mod tools</SidebarLink>

        {/* Add more links and icons as needed */}
      </SidebarContent> :
        <><SidebarIcon href="#"></SidebarIcon><SidebarIcon href="#"></SidebarIcon><SidebarIcon href="#"></SidebarIcon></>}
    </SidebarContainer><>{children}</></>
  );
};

export default Sidebar;