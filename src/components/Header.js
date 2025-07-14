import React from 'react';

function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-sky-500 to-indigo-500 shadow-md py-8 px-4 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-sans drop-shadow-lg">
        TripScanner India
      </h1>
      <p className="text-lg sm:text-xl text-sky-100 mt-2 font-medium">
        Plan your next Indian adventure
      </p>
    </header>
  );
}

export default Header;
