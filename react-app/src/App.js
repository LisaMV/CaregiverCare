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


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Sidebar/>
      <div className='container'>
        <Navbar/>
        <Switch>
          <Route  exact path='/'>
            <Dashboard/>
          </Route>
          <Route path ="/addclients">
            <AddClients/>
          </Route>
          <Route path ="/calendar">
            <Calendar/>
          </Route>
          <Route path ="/createvisit">
            <CreateVisit/>
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
