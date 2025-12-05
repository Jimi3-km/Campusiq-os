
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 max-w-4xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
             <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM5 9a1 1 0 000 2h2a1 1 0 100-2H5zm4 0a1 1 0 000 2h2a1 1 0 100-2H9zm4 0a1 1 0 100 2h2a1 1 0 100-2h-2z" clipRule="evenodd" />
                </svg>
             </div>
            <h1 className="text-xl font-bold text-brand-blue-dark">CampusIQ</h1>
          </div>
          <div className="w-9 h-9 bg-brand-gray-100 rounded-full">
            <img src="https://picsum.photos/id/237/100/100" alt="User" className="w-full h-full rounded-full object-cover"/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
