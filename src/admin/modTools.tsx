import React, { useState } from 'react';
import ModToolsPopup from './modToolsPopup';
interface ModerationToolsProps {
    userRole: string;
  }
  
const ModTools: React.FunctionComponent<ModerationToolsProps>= ({ userRole }) => {
  const isOwner = userRole === 'OWNER';
  const isTier1Moderator = userRole === 'MODERATOR_TIER_1';
  const isTier2Moderator = userRole === 'MODERATOR_TIER_2';
  const isTier3Moderator = userRole === 'MODERATOR_TIER_3';

 const [showPopup, setShowPopup ] = useState(false);
 const [tool, setTool] = useState('STANDARD')

 const handleButtonClick = (tool: React.SetStateAction<string>) => {
   setShowPopup(!showPopup)
   setTool(tool)
  }
  function changeTags() {
      handleButtonClick('change-tags')
  }
  function changeDescription() {
      handleButtonClick('change-description')
  }
  function viewReports(){
        handleButtonClick('view-reports')
    }
    function editRules(){
        handleButtonClick('edit-rules')
    }
    function flagUser(){
        handleButtonClick('flag-user')
    }
    function banUser(){
        handleButtonClick('ban-user')
    }
    function setBanner(){
        handleButtonClick('set-banner')
    }
    function banTemp(){
        handleButtonClick('ban-temp')
    }
    function setMOTD(){
        handleButtonClick('set-motd')
    }
    function timeoutUser(){
        handleButtonClick('timeout-user')
    }
    function addMod(){
        handleButtonClick('add-mod')
    }
    function deleteBoard(){
        handleButtonClick('delete-board')
    }

  return (
    <div>
      <h3>Mod Tools</h3>
      {/* Display different tools for each role */}
      {isOwner && (
        <div>
          <h4>Owner Tools</h4>
          {/* Display owner-specific moderation tools */}
          <button onClick={changeTags}>change tags</button>
          <button onClick={changeDescription}>change description</button>
          <button onClick={addMod}>Invite Mod</button>
          {/* Add more owner-specific tools here */}
        </div>
      )}

      {isTier3Moderator || isOwner && (
        <div>
          <h4>Tier 3 Moderator Tools</h4>
          {/* Display tier 2 moderator-specific moderation tools */}
          <button onClick={banUser}>Ban User Permanently</button>
          <button onClick={flagUser}>Flag User for Mod Review</button>
          <button onClick={editRules}>Edit Rules</button>
          {}
        </div>
      )}
      {isTier2Moderator || isTier3Moderator || isOwner && (
        <div>
          <h4>Tier 2 Moderator Tools</h4>
          {/* Display tier 2 moderator-specific moderation tools */}
          <button onClick={banTemp}>Ban User Temporarily</button>
          {/* <button onClick={changeDescription}>Flag User for Mod Review</button> */}
          <button onClick={setBanner}>Set Banner</button>
          {/* Add more tier 2 moderator-specific tools here */}
        </div>
      )}

      {isTier1Moderator || isTier2Moderator || isTier3Moderator && (
        <div>
          <h4>Tier 1 Moderator Tools</h4>
          {/* Display tier 1 moderator-specific moderation tools */}
          <button onClick={timeoutUser}>Timeout User</button>
          {/* <button onClick={changeDescription} >Save Comment for Review</button> */}
          <button onClick={setMOTD}>Change Message Of The Day</button>
          {/* Add more tier 1 moderator-specific tools here */}
        </div>
      )}

      {/* Common tools for all roles */}
      <div>
        <h4>Common Tools</h4>
        <button onClick={viewReports}>View Reports</button>
        {/* Add more common tools here */}
      </div>
      {showPopup && <ModToolsPopup tool={tool}/>}
    </div>
  );
};

export default ModTools;
