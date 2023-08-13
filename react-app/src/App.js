import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'; // Importing components from react-router-dom v6
import './App.css';

// Components
import Dashboard from './components/Dashboard';
import AddClients from './components/addclients';
import CreateVisit from './components/createvisit';
import Login from './components/login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Import UserAuth
import { UserAuth } from './context/AuthContext';

function App() {
  const { user } = UserAuth();

  return (
    <div className="App">
      <BrowserRouter>
        {user && <Sidebar />}
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/addclients" element={user ? <AddClients /> : <Login />} />
            <Route path="/createvisit" element={user ? <CreateVisit /> : <Login />} />
            <Route path="/" element={user ? <Dashboard /> : <Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
