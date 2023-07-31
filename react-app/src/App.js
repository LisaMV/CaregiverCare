import {BrowserRouter,Route,Switch} from 'react-router-dom'
import './App.css';
import {signInWithGoogle} from './Firebase'


//components 
import Dashboard from './components/Dashboard';
import AddClients from './components/addclients';
import Calendar from './components/calendar';
import CompletedVisits from './components/completedvisits';
import CreateVisit from './components/createvisit';
import Login from './components/login';
import Project from './components/project';


function App() {
  return (
    <div className="App">
      <button className='login-with-google-btn' onClick={signInWithGoogle}>Sign in with Google</button>
      <BrowserRouter>
      <div className='container'>
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
          <Route path ="/completedvisits">
            <CompletedVisits/>
          </Route>
          <Route path ="/projects/:id">
            <Project/>
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
