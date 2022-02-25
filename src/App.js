import { Routes, Route } from 'react-router-dom';
import './App.css';
import Giphy from './components/Giphy';
import GiphyDetails from './components/GiphyDetails';
import Routing from './route';

const App = () => {
  return (
    <div className="App">
      {/* <Giphy /> */}
      {/* <Routing /> */}
      <Routes>
        <Route exact path="/" element={ <Giphy /> } />
        <Route exact path="/:id" element={ <GiphyDetails />} />
      </Routes>
    </div>
  );
}

export default App;
