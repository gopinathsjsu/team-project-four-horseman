const app = require("./app");
const port = 3000;

app.use("/user", require("./routes/userRoutes"));

app.listen(port, () => {
  console.log(`Started http://localhost:${port}`);
});
