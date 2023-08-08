import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const popupConent = styled.div`
position: fixed;
top: 50%; /* Adjust this value to center the popup vertically */
left: 0;
transform: translateY(-50%);
background-color: white;
padding: 10px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
z-index: 999; /* Ensure the popup appears above other elements */
overflow: scroll;
` 

interface Tools {
  tool: string;
}

const ModToolsPopup: React.FunctionComponent<Tools> = ({ tool }) => {
  const [banName, setBanUsername] = useState('');
  const location = useLocation();
  const url = location.pathname
  const urlarr = url.split('/')
  const boardName = urlarr[(url.length - 1)]
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBanUsername(event.target.value);
  };
  
  function changeTags() {
  
  }
  function changeDescription() {
    
  }
  function viewReports(){
      
  }
  function editRules(){
      
  }
  function flagUser(){
      
  }
  async function banUser(){
      const userRole = axios.post(`./api/${boardName}/ban`, {banName})
  }
  function setBanner(){
      
  }
  function banTemp(){
      
  }
  function setMOTD(){
      
  }
  function timeoutUser(){
      
  }
  function addMod(){
      
  }
  if (tool === 'view-reports'){
    return (
      <div>
        view reports
      </div>
    )
  }  
  else if (tool === 'edit-rules'){
    return (
      <div>
        edit rules
      </div>
    )
  }  
  else if (tool === 'flag-user'){
    return (
      <div>
        flag-user
      </div>
    )
  }  
  else if (tool === 'add-mod'){
    return (
      <div>
        ban-user
      </div>
    )
  }  
  else if (tool === 'ban-user'){
    return (
      <div>
        ban-user
      </div>
    )
  }  
  else if (tool === 'ban-temp'){
    return (
      <div>
        ban-temp
      </div>
    )
  }  
  else if (tool === 'edit-rules'){
    return (
      <div>
        edit-rules
      </div>
    )
  }  
  else if (tool === 'set-banner'){
    return (
      <div>
        set-banner
      </div>
    )
  }  
  else if (tool === 'timeout-user'){
    return (
      <div>
        timeout-user
      </div>
    )
  }  
  else if (tool === 'set-motd'){
    return (
      <div>
        set-motd
      </div>
    )
  }  
  else if (tool === 'delete-board'){
    return (
      <div>
      <input type="text" value={banName} onChange={handleUsernameChange} />
      <button onClick={banUser}>Ban User</button>
    </div>
    )
  }  
  else{
    return (
      <div>no tool for {tool}</div>
    )
  }

  return (
      <div className="popup-content">asdf
        {/* Your popup content goes here */}
      </div>
    );
  };

  export default ModToolsPopup