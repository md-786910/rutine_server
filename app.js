const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path')
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });



const port = process.env.PORT || 5000
// add static file 

app.use("/", express.static(path.join(__dirname, "/public")))

// DATABASE_URI="mongodb://localhost:27017/rutine_handler"

// "dev": "nodemon app.js -e js,html,css"
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

require('./db/conn')

// parser the body
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// app.use(helmet())


// add routes path
app.use(require('./route'))


app.listen(port, () => {
    console.log('listening on port at ' + port)
})