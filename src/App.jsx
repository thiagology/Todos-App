import React from 'react';
import Routes from './routes';
import BG from './bg_img.jpg';

const App = () => (
  <div className="App" style={{ backgroundImage: `url(${BG})` }}>
    <Routes />
  </div>
);

export default App;
