const { seats } = require("../util/seatMap");

const getNewSeats = () => {
  return JSON.stringify({ ...seats() });
};

const getSeatsOfUser = (seatMap, userId) => {
  let seats = [];
  for (let val of Object.keys(seatMap)) {
    if (seatMap[val].userId === userId) {
      seats.push({ seatNo: val, passengerName: seatMap[val].passengerName });
    }
  }
  return seats;
};

const updateSeats = (userId, seats, newSeats) => {
  for (let val of newSeats) {
    seats.seatMap[val.seatNo].userId = userId;
    seats.seatMap[val.seatNo].passengerName = val.passengerName;
  }
  seats.availableSeats = seats.availableSeats - newSeats.length;
  seats.pnrCount = seats.pnrCount + 1;
  return JSON.stringify(seats);
};

const removeUserSeats = (userId, seats) => {
  for (let val of Object.keys(seats.seatMap)) {
    if (seats.seatMap[val].userId == userId) {
      seats.seatMap[val].userId = "";
      seats.seatMap[val].passengerName = "";
      seats.availableSeats++;
    }
  }
  return JSON.stringify(seats);
};

module.exports = {
  getNewSeats,
  updateSeats,
  getSeatsOfUser,
  removeUserSeats,
};
