import React, { useState } from "react";
import './Avatar.css';

const Avatar = ({ avatar, name }) => {
  const [error, setError] = useState(false);
  const userInitial = name ? name[0].toUpperCase() : "?"; 

  return (
    <>
      {error ? (
        <div className="avatar-placeholder">
          {userInitial}
        </div>
      ) : (
        <img
          src={avatar}
          className="avatar-image"
          alt={name}
          onError={() => setError(true)}
        />
      )}
    </>
  );
};

export default Avatar;