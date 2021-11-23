const app = require("./app");
const port = 3000;

app.use("/user", require("./routes/userRoutes"));
app.use("/flights", require("./routes/flightRoutes"));
app.use("/booking", require("./routes/bookingRoutes"));

app.listen(port, () => {
  console.log(`Started http://localhost:${port}`);
});
