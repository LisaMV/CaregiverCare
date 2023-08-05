
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import './App.css';



//components 
import Dashboard from './components/Dashboard';
import AddClients from './components/addclients';
import Calendar from './components/calendar';
import CreateVisit from './components/createvisit';
import Login from './components/login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

//import UserAuth
import { UserAuth } from './context/AuthContext';

function App() {
  const {user}=UserAuth();
  return (
    <div className="App">
      <BrowserRouter>
      <Sidebar/>
      <div className='container'>
        <Navbar/>
        <Switch>
          <Route  exact path='/'>
            {user ? <Dashboard/> :<Login/>}
          </Route>
          <Route path ="/addclients">
            {user ? <AddClients/> :<Login/>}
          </Route>
          <Route path ="/calendar">
           {user ?  <Calendar/> :<Login/>}
          </Route>
          <Route path ="/createvisit">
            {user ? <CreateVisit/> : <Login/>}
          </Route>
          <Route path ="/login">
            <Login/>
          </Route>
        </Switch>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;