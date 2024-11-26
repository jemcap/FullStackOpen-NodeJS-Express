const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()


mongoose.set("strictQuery", false)

const uri = process.env.MONGODB_URI

mongoose.connect(uri).then(result => {
    console.log('Connected to database')
}).catch(error => {
    console.log(error.message)
})

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String
})

phonebookSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString();
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('User', phonebookSchema)