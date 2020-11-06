require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
// const bodyParser = require("bodyParser");

const PORT = process.env.PORT || 3001;
// process.env.JWT_SECRET || "YOUR_secret_key";

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(compress());
// app.use(helmet());
// app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/my-mern", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose successfully connected.");
});

connection.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
});

// app.get("/api/config", (req, res) => {
//   console.log(req, res);
// });

app.use(express.static("client/build"));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.get("/", (req, res) => {
  res.status(200).send(Template());
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
