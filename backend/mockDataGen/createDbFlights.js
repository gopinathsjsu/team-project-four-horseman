const { airports, flights } = require("../models/index");
const { getNewSeats } = require("../models/seats");
const faker = require("faker");
var moment = require("moment");

const createFlightCode = (a) => {
  let randNum = faker.random.number(999);
  let rand1 = faker.random.number(a.length - 1);
  let rand2 = faker.random.number(a.length - 1);
  let randChars =
    a[rand1] + a[rand2] + String(randNum.toString()).padStart(3, "0");
  return randChars;
};

const getDistance = (location1, location2) => {
  let lat1 = parseFloat(location1.split(",")[0]);
  let lon1 = parseFloat(location1.split(",")[1]);
  let lat2 = parseFloat(location2.split(",")[0]);
  let lon2 = parseFloat(location2.split(",")[1]);

  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;
  var a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 2 * 3956 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};

const getPrice = (distance) => {
  return parseFloat((distance * 0.093).toFixed(2));
};

const getFakeDate = () => {
  const fakeDate = faker.date.between(
    "2021-12-3 00:00:00",
    "2021-12-3 23:59:59"
  );
  console.log("fakeDate", fakeDate);
  return fakeDate;
};

const getTax = (price) => {
  return parseFloat((price * 0.1).toFixed(2));
};

const getArrTime = (distance, deptTime) => {
  let timetaken = distance / 330.0;
  return moment(deptTime)
    .add(timetaken, "hours")
    .format("YYYY-MM-DD[T]HH:mm:ss");
};
let count = 0;

airports.findAll().then((res) => {
  let ports = JSON.parse(JSON.stringify(res));
  for (let i = 0; i < ports.length; i++) {
    let remPorts = ports.filter((item) => item.id != ports[i].id);
    for (let val of remPorts) {
      let dist = getDistance(ports[i].location, val.location);
      if (dist < 600) continue;
      let deptTime = moment(getFakeDate()).format("YYYY-MM-DD[T]HH:mm:ss");
      let temp = {
        from: ports[i].id,
        to: val.id,
        flightCode: createFlightCode(ports[i].airportCode + val.airportCode),
        deptTime: deptTime,
        arrTime: getArrTime(dist, deptTime),
        price: getPrice(dist),
        tax: getTax(getPrice(dist)),
        seats: getNewSeats(),
      };
      //   console.log(temp);
      flights
        .create(temp)
        .then((res) => console.log(count++))
        .catch((err) => console.log("err", err));
    }
  }
});
