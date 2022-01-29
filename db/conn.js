const mongoose = require('mongoose')

const database = process.env.DATABASE_URI

mongoose.connect(database, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: true,
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,


}).then(() => {
    console.log("connect success")
}).catch((error) => {
    console.log("connect error " + error)
})