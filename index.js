const app = require('express')();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./database');
const router = require('./router');

database.authenticate().then(() => console.log("Database is connected..."))
    .catch((error) => console.log("Database is not connected :: ", error))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router)
app.use(cors());

app.listen(process.env.PORT,
    () => console.log(`Server is running on port number : ${process.env.PORT} `));
