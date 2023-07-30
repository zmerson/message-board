import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const AlreadySignedIn = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    return (
        <div>
            <p>you are already signed in</p>
            <p>click 
                <Link to="">here </Link> to sign out
                or 
                <Link to="">here</Link> to go back
            </p>
        </div>
    )
}