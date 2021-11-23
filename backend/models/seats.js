const { seats } = require("../util/seatMap");

const getNewSeats = () => {
  return JSON.stringify({ ...seats });
};

module.exports = {
  getNewSeats,
};
