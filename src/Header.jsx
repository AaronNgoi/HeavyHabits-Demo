import React from 'react';


const Header = ({ text }) => {
  return (
    <header className="header bg-brown-pet-bg relative pt-3 ">
      <h1 className="text-2xl  text-center font-bold text-biege-form-colour z-10 relative">{text}</h1>
    </header>
  );
};


export default Header;