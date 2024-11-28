const express = require("express");
const moment = require("moment");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const User = require("./models/phonebookUser");
const errorHandler = require("./middleware/errorMiddleware");

const cors = require("cors");
// g5MPqQO5It8SZrRw
const app = express();
app.use(cors());

app.use(express.json());

app.get("/api/persons", (req, res) => {
  User.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send({ error: "Cannoted retrieve users." });
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

app.get("/api/persons/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then((result) => {
      res.json({ data: result });
    })
    .catch((error) => {
      next(error);
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

app.post("/api/persons", async (req, res, next) => {
  const user = req.body;
  console.log(user);

  if (!user.name || !user.number) {
    return res.status(400).json({
      error: "User missing.",
    });
  }

  try {
    const existingUser = await User.findOne({
      name: user.name,
      number: user.number,
    });
    if (existingUser) {
      return res.status(400).json({ error: "Entry must be unique" });
    }
    const newUser = new User({
      name: user.name,
      number: user.number,
    });
    await newUser.save().then((savedUser) => {
      res.json(savedUser);
    });
  } catch (error) {
    next(error);
  }
});

// Exercise 3.17*
app.put("/api/persons/:id", (req, res, next) => {
  const user = req.body;
  const id = req.params.id;

  if (!user.number || !user.name) {
    return res.status(400).send({ error: "Number is missing" });
  }

  const updatedNumber = { number: user.number };

  User.findByIdAndUpdate(id, updatedNumber, { new: true })
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((error) => next(error));
});

app.use(express.static("dist"));

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
