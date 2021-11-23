const airportsJson = require("../worldAirports.json");
const cities = require("./cities.json");
const { airports } = require("../models/index");

// const areAirportPopulated = async () => {
//   let val = await airports.findOne();
//   if (val) return;
// };
for (let val of cities) {
  var filteredAirports = airportsJson.filter((item) => {
    return (
      item.city == val.city &&
      item.state == val.state &&
      item.iata &&
      item.iata != ""
    );
  });
  console.log(filteredAirports);
  for (let ap of filteredAirports) {
    airports
      .create({
        name: ap.name,
        city: ap.city,
        airportCode: ap.iata,
        location: ap.lat + "," + ap.lon,
        tz: ap.tz,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log("err", err));
  }
}

//
