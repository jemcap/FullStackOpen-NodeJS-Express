const mongoose = require("mongoose");
const dotenv = require('dotenv')

dotenv.config()


const uri = process.env.MONGODB_URI;
console.log(uri)

mongoose.connect(uri).then((result) => {
  console.log("Connected to MongoDB")
}).catch(error => {
  console.log(error.message)
});

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const User = mongoose.model("User", phonebookSchema);

const phonebookUser = new User({
  name: "James",
  number: "01480453708",
});

phonebookUser.save().then((result) => {
  console.log(`added ${phonebookUser.name} and their number ${phonebookUser.number} to phonebook`);
});

User.find({}).then((result) => {
  result.forEach((user) => {
    console.log(user);
  });
  mongoose.connection.close();
});
