import logo from './logo.svg';
import './App.css';
import GestaoImagem from './views/GestaoImagem.jsx';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<GestaoImagem/>}/>
    </Routes>
   </Router>
  );
}

export default App;
