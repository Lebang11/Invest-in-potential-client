import React from 'react';
import Cookies from 'js-cookie';

const UserStatus = () => {
    const username = Cookies.get('token_username');
    
    if (!username) return null;
    
    return (
        <div className="d-flex align-items-center">
            <span className="text-success me-2">●</span>
            <span className="text-muted">{username}</span>
        </div>
    );
};

export { UserStatus }; 