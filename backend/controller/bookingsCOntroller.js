export const generatePNR = (flightDate) => {
  return (
    flightDate.flightCode.substring(0, 3) +
    String(flightDate.seats.availableSeats.toString()).padStart(3, "0")
  );
};
