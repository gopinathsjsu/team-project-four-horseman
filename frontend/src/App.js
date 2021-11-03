import Register from "./components/RegisterPage/Register";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import FindReservations from "./components/ManageReservations/FindReservations";


function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
        <Route exact path='/'>
          <Register/>
        </Route>
        <Route path='/reservations'>
          <FindReservations/>
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
