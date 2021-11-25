const { seats } = require("../util/seatMap");

const getNewSeats = () => {
  return JSON.stringify({ ...seats() });
};

const updateSeats = (userId, seats, newSeats) => {
  for (let val of newSeats) {
    seats.seatMap[val.seatNo].userId = userId;
    seats.seatMap[val.seatNo].passengerName = val.passengerName;
  }
  seats.availableSeats = seats.availableSeats - 1;
  return JSON.stringify(seats);
};

module.exports = {
  getNewSeats,
  updateSeats,
};
