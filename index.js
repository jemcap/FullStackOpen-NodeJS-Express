const express = require("express");
const moment = require("moment");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const User = require("./models/phonebookUser");

const cors = require("cors");
// g5MPqQO5It8SZrRw
const app = express();
app.use(cors());

// let phonebook = [
//   {
//     id: "1",
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: "2",
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: "3",
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: "4",
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

app.use(express.json());

app.use(express.static("dist"));

app.get("/api/persons", (req, res) => {
  User.find({}).then((result) => {
    res.json(result);
  });
});
// =============================================
// Exercise 3.8*
morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
// =============================================

app.get("/info", (req, res) => {
  const phonebookList = phonebook.length;
  let timestamp = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
  res
    .status(200)
    .send(
      `<p>Phonebook has info for ${phonebookList} people</p><p>${timestamp}</p>`
    );
});

app.get("/api/persons/:id", (req, res) => {
  User.findById(req.params.id).then((result) => {
    res.json({ data: result });
  });
});

app.delete("/api/persons/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id).then((result) => {
    res.status(200).json({ message: "User deleted" });
  });
});

const generateId = () => {
  // const latestId = Math.max(...phonebook.map((p) => Number(p.id)));
  // const userId = Math.floor(Math.random() * 1000) + latestId + 1;
  // return String(userId);
};

app.post("/api/persons", (req, res) => {
  const user = req.body;

  console.log(user);

  if (!user.name || !user.number) {
    return res.status(400).json({
      error: "User missing.",
    });
  }

  User.findOne({ name: user.name }).then((existingUser) => {
    if (existingUser) {
      return res.status(400).json({ error: "Entry must be unique" });
    }
  });

  const newUser = new User({
    name: user.name,
    number: user.number,
  });
  newUser.save().then((savedUser) => {
    res.json(savedUser);
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
