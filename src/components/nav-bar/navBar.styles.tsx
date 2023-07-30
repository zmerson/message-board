import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #2196f3;
  z-index: 10;
  position: relative;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
  font-weight: bold;
`;

export const NavLinks = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  margin-right: 10px;
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  &:hover {
    background-color: #1976d2;
    border-radius: 5px;
  }
`;

export const SignOutButton = styled.button`
  padding: 10px 15px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  &:hover {
    background-color: #1976d2;
    border-radius: 5px;
  }
`;
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';

// export const NavigationContainer = styled.div`
//   height: 70px;
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 25px;
//   background-color: cyan;
// `;

// export const LogoContainer = styled(Link)`
//   height: 100%;
//   width: 70px;
//   padding: 25px;
// `;

// export const NavLinks = styled.div`
//   width: 50%;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
// `;

// export const NavLink = styled(Link)`
//   padding: 10px 15px;
//   cursor: pointer;
// `;
