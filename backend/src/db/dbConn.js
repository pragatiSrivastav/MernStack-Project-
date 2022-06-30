const mongoose = require('mongoose')

//creation connection to database olympics
mongoose.connect("mongodb://localhost:27017/eNotes", {
    useNewUrlParser: true
}).then(() => {
    console.log("database connected successful")
}).catch((e) => {
    console.log("Oops! No connection found")
})