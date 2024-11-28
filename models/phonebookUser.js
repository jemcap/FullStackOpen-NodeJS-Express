const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.set("strictQuery", false);

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then((result) => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(error.message);
  });

//   Exercise 3.19*
const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  // 3.20*
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d{8}$/.test(v);
      },
    },
  },
});

phonebookSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("User", phonebookSchema);
