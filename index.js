const express = require("express");
const moment = require("moment");
const morgan = require("morgan");

const cors = require("cors");

const app = express();
app.use(cors());

let phonebook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());

app.use(express.static("dist"));

app.get("/api/persons", (req, res) => {
  res.json(phonebook);
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
  const id = req.params.id;
  console.log(id);
  const isExisting = phonebook.find((user) => user.id === id);
  if (isExisting) {
    res.status(200).json(isExisting);
  } else {
    res.status(404).json({ message: "Cannot retrieve user" });
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  phonebook = phonebook.filter((user) => user.id !== id);
  res.status(200).json({ message: "Successfully deleted user." });
});

const generateId = () => {
  const latestId = Math.max(...phonebook.map((p) => Number(p.id)));
  const userId = Math.floor(Math.random() * 1000) + latestId + 1;
  return String(userId);
};

app.post("/api/persons", (req, res) => {
  const user = req.body;

  console.log(user);

  const isExistingEntry = phonebook.find((book) => book.name === user.name);
  if (!user.name || !user.number) {
    return res.status(400).json({
      error: "User missing.",
    });
  } else if (isExistingEntry) {
    return res.status(400).json({
      error: "Name must be unique",
    });
  }

  const newUser = {
    id: generateId(),
    name: user.name,
    number: user.number,
  };
  phonebook = phonebook.concat(newUser);
  res.status(200).json({ data: newUser, message: "User successfully created" });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
