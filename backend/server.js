import dotenv from "dotenv";
import app from "./src/app.js";
import { connectDB } from "./src/lib/db.js";

dotenv.config();

app.use("/test", (res) => {
  res.status(200).send(JSON.stringify({ server_running: true }));
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDB();
});
