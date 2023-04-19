import React from 'react';

const Header = ({ text }) => {
  return (
    <header className="header py-6 border-b-2 border-brown-header-bottom">
            <h1 className="text-3xl font-bold mb-6 " >{text}</h1>
    </header>
    
  );
};

export default Header;