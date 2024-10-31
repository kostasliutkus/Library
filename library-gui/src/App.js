import './App.css';
import Books from './Components/Books';
import Reservations from './Components/Reservations';
import Home from './Components/Home';
import ButtonAppBar from './Components/ButtonAppBar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddReservation from './Components/AddReservation';
function App() {
  return (
    <div class="App">
     <ButtonAppBar/>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/books" element={<Books />} />
        <Route path="/reservations/add/:id" element={<AddReservation/>}/>
    </Routes>
    

    </div>
  );
}

export default App;