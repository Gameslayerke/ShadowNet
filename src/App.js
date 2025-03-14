import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SingUp from './Components/SignUp';
import GetProducts from './Components/GetProducts';
import SignIn from './Components/SignIn';
import AddProducts from './Components/AddProduct';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Shadow Net - It all about speed</h1>
        </header>
        <Routes>
          <Route path="/SignUp" element={<SingUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/AddProduct" element={<AddProducts />} />
          <Route path="/" element={<GetProducts />} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;