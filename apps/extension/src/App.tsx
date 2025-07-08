import * as React from 'react';
import logo from './logo.png';
import './App.css';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <header className="flex flex-col items-center justify-center p-8">
        <img src={logo} className="mb-4 h-4 w-4 animate-spin" alt="logo" />
        <p className="text-3xl font-semibold">짜잔 난 핀백 다람쥐야~</p>
      </header>
    </div>
  );
};

export default App;
