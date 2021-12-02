import Register from "./components/RegisterPage/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FindReservations from "./components/ManageReservations/FindReservations";
import BookFlights from "./components/BookFlights/BookFlights";
import MyReservations from "./components/MyReservations/MyReservations";
import DisplayFlights from "./components/DisplayFlights/DisplayFlights";
import UserProfile from "./components/UserProfile/UserProfile";
import LoginPage from "./components/LoginPage/Login";
import SingleFlightDetails from "./components/DisplayFlights/SingleFlightDetails";
import NavigationBar from "./components/RegisterPage/NavigationBar";
import PassengerDetails from "./components/PassengerInformation/PassengerDetails";
import SeatSelection from "./components/PassengerInformation/SeatSelection";

function App() {
  return (
    <Router>
      <NavigationBar />

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
          <Route exact path="/booking">
            <MyReservations />
          </Route>
          <Route exact path="/travellerInfo">
            <PassengerDetails />
          </Route>
          <Route exact path="/seatSelection">
            <SeatSelection />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
