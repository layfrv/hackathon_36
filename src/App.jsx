import { useEffect, useState } from 'react';
import './App.css';
import Loader from './components/Loader';
import GamePage from './pages/GamePage';

function App() {
  return (
    <div className='app'>
      <GamePage />
    </div>
  );
}
export default App;
