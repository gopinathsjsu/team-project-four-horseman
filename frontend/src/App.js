import Register from "./components/RegisterPage/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FindReservations from "./components/ManageReservations/FindReservations";
import BookFlights from "./components/BookFlights/BookFlights";
import MyReservations from "./components/MyReservations/MyReservations";
import DisplayFlights from "./components/DisplayFlights/DisplayFlights";

import UserProfile from "./components/UserProfile/UserProfile";
import LoginPage from "./components/LoginPage/Login";
import SingleFlightDetails from "./components/DisplayFlights/SingleFlightDetails";

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
          <Route
            exact
            path="/userprofile"
            render={(props) => <UserProfile {...props} />}
          ></Route>
          <Route exact path="/booking">
            <MyReservations />
          </Route>
          <Route exact path="/displayflights">
            <DisplayFlights />
          </Route>
          <Route exact path="/displayflights/:id">
            <SingleFlightDetails />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
