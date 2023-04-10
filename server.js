import connection from "./db/conn.js";
import express from "express";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import cors from "cors";

const app = express();

const port = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

//database
connection();

//Routes
app.get("/", (req, res) => {
  res.send("Helllllll.....");
});

//Listening

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
