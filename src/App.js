import logo from './logo.svg';
import './App.css';
import Pokemon from './Pokemon';
import { useState } from 'react';

function App() {
  const [isLoading,setIsLoading] = useState(false);
  return (
    <div className='App'>
     <Pokemon isLoading={isLoading} setIsLoading={setIsLoading}/>
    </div>
  );
}

export default App;
