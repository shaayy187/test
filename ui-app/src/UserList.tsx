//import React, { useState } from 'react';
import './index.css'; 

function UserList() {
  return (
    <div className="container">
      <div id="putinto">
        <h2>Let's level up your brand, together</h2>
        
        <h3>Enter Username</h3>
        <input type="text" placeholder="First Name" />
        
        <h3>Enter Lastname</h3>
        <input type="text" placeholder="Last Name" />
        
        <h3>Role</h3>
        <input type="text" placeholder="Role" />
        
        <div id="privacy">
          <input type="checkbox" id="privacyPolicy" />
          <label htmlFor="privacyPolicy" className="privacyPolicy">
            You agree to our friendly{' '}
            <a href="https://www.w3schools.com" target="_blank">
              privacy policy.
            </a>
          </label>
        </div>
        
        <button id="submitbut">SUBMIT</button>
      </div>

      <div id="usersList">
      </div>
    </div>
  );
};

export default UserList;
