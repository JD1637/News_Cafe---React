import './App.css';
import Navbar from './componants/Navbar';
import News from './componants/News';
import React from 'react';

function App() {
  return (
    <div className="App">
      <Navbar />
      <News pageSize={6}></News>
    </div>
  );
}

export default App;
