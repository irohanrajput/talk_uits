import app from "./app.js";

app.use("/", (req, res) => {
  res.status(200).send(JSON.stringify({"server_running":true}));
});

app.listen(5001, () => {
  console.log("server is running on port 5001");
});
