import "./pre-start"; // Must be the first import
import app from "./Server";

import bodyParser from 'body-parser';
import mysql from 'mysql';

// Start the server
const port = Number(process.env.PORT || 8080);

// Parse the requests of content-type 'application/json'
app.use(bodyParser.json());

// Create the MySQL connection pool
const pool = mysql.createPool ({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'my_database'
});

app.listen(port, () => {
  console.log("Express server started on port: " + port);
});
