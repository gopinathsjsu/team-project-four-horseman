import Register from "./components/RegisterPage/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FindReservations from "./components/ManageReservations/FindReservations";
import BookFlights from "./components/BookFlights/BookFlights";
import MyReservations from "./components/MyReservations/MyReservations";
import DisplayFlights from "./components/DisplayFlights/DisplayFlights";
import LoginPage from "./components/LoginPage/Login";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route path="/reservations">
            <FindReservations />
          </Route>
          <Route exact path="/">
            <BookFlights />
          </Route>
          <Route exact path="/userprofile">
            <UserProfile />
          </Route>
          <Route exact path="/booking">
            <MyReservations />
          </Route>
          <Route exact path="/displayflights">
            <DisplayFlights />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
